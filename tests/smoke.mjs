import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright-core';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:3000';
const browserPath = process.env.CHROMIUM_PATH || '/usr/bin/chromium';
const tempDir = await mkdtemp(path.join(os.tmpdir(), 'nsbs-smoke-'));
const portraitPath = path.join(tempDir, 'portrait.png');
const portraitPng = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jB8kAAAAASUVORK5CYII=', 'base64');
await writeFile(portraitPath, portraitPng);

const browser = await chromium.launch({ headless: true, executablePath: browserPath, args: ['--no-sandbox'] });
const page = await browser.newPage({ acceptDownloads: true, viewport: { width: 1440, height: 1000 } });
const pageErrors = [];
page.on('pageerror', error => pageErrors.push(error.message));

try {
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Student Access' }).click();
  await page.getByPlaceholder('e.g. 23/14/0842').fill('23/14/0842');
  await page.getByPlaceholder('Enter portal password').fill('studentpassword123');
  await page.locator('form').filter({ has: page.getByPlaceholder('e.g. 23/14/0842') }).locator('button[type="submit"]').click();
  await page.getByText('Welcome back, Aliyu Ibrahim').waitFor();

  await page.getByRole('button', { name: 'Dashboard Settings', exact: true }).click();
  await page.locator('input[type="file"]').setInputFiles(portraitPath);
  await page.getByPlaceholder('Add any other field or specialist research area').fill('Clinical Proteomics');
  await page.getByRole('button', { name: 'Add interest' }).click();
  await page.getByPlaceholder('e.g. PhD in clinical enzymology, medical research, biotech founder').fill('Lead an independent clinical biochemistry lab');
  await page.getByRole('button', { name: 'Add aspiration' }).click();
  await page.getByRole('button', { name: 'Save Profile & Settings' }).click();
  await page.getByText('Student dashboard profile settings saved successfully!', { exact: false }).waitFor({ timeout: 5000 }).catch(() => {});
  const savedProfile = await page.evaluate(() => JSON.parse(localStorage.getItem('nsbs_student_user') || '{}'));
  assert.ok(savedProfile.profilePhoto?.startsWith('data:image/jpeg;base64,'), 'profile photo should be optimized and persisted');
  assert.ok(savedProfile.interests.includes('Clinical Proteomics'), 'custom interests should persist');
  assert.ok(savedProfile.futureAspirations.includes('Lead an independent clinical biochemistry lab'), 'future aspirations should persist');
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await page.getByRole('button', { name: 'Save Profile & Settings' }).click();
  const profileAfterPhotoRemoval = await page.evaluate(() => JSON.parse(localStorage.getItem('nsbs_student_user') || '{}'));
  assert.equal(profileAfterPhotoRemoval.profilePhoto, undefined, 'removing the portrait should clear it from the saved profile');

  await page.locator('button[title="Sign out of student portal"]').click();
  await page.getByRole('button', { name: 'Admin Portal' }).click();
  await page.getByPlaceholder('Enter administrator username').fill('Admin_1');
  await page.getByPlaceholder('Enter administrator password').fill('NSBS_2026');
  await page.getByRole('button', { name: 'Authenticate & Enter Dashboard' }).click();
  await page.getByText('Admin Session Active').waitFor();
  await page.getByText('Certificate Issuer', { exact: true }).first().click();
  await page.getByText('Certificate studio & issuance').waitFor();

  const registeredStudents = await page.evaluate(() => JSON.parse(localStorage.getItem('nsbs_registered_students') || '[]'));
  const student = registeredStudents.find(item => item.matricNumber === '23/14/0842');
  assert.ok(student, 'seeded student should be selectable by admin');
  await page.locator('form select').first().selectOption(student.id);
  await page.locator('input[type="file"]').nth(0).setInputFiles(portraitPath);
  await page.locator('input[type="file"]').nth(1).setInputFiles(portraitPath);
  await page.locator('img[alt="Certificate organization logo"]').waitFor();
  await page.locator('img[alt="Authorized signature"]').waitFor();
  await page.getByPlaceholder('e.g. Clinical Diagnostics Workshop').fill('Clinical Diagnostics and Biomarker Workshop');
  await page.getByRole('button', { name: 'Issue certificate' }).click();
  await page.getByText('Issued certificates', { exact: true }).waitFor();
  await page.locator('.certificate-artwork-programme').getByText('Clinical Diagnostics and Biomarker Workshop').waitFor();

  await page.getByRole('button', { name: 'Edit & preview' }).first().click();
  const recipientInput = page.getByPlaceholder('Student full name');
  await recipientInput.fill('Aliyu Ibrahim Corrected');
  await page.getByRole('button', { name: 'Save certificate edits' }).click();
  await page.getByText('Aliyu Ibrahim Corrected · Clinical Diagnostics and Biomarker Workshop', { exact: false }).waitFor();

  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.getByRole('button', { name: 'Download PDF' }).first().click()
  ]);
  const pdfPath = await download.path();
  const pdfBytes = await readFile(pdfPath);
  assert.equal(pdfBytes.subarray(0, 5).toString('ascii'), '%PDF-', 'download should be a real PDF document');
  assert.ok(pdfBytes.length > 2_000, `PDF should contain a rendered certificate (received ${pdfBytes.length} bytes)`);
  const pdfInfo = execFileSync('pdfinfo', [pdfPath], { encoding: 'utf8' });
  assert.match(pdfInfo, /Pages:\s+1/, 'certificate should be a single-page document');
  assert.match(pdfInfo, /Page size:\s+841\.89 x 595\.28 pts \(A4\)/, 'certificate should use landscape A4 orientation');
  assert.match(pdfBytes.toString('latin1'), /\/Subtype \/Image/, 'uploaded logo/signature should be embedded in the PDF');
  const pdfText = execFileSync('pdftotext', [pdfPath, '-'], { encoding: 'utf8' });
  assert.ok(pdfText.includes('Aliyu Ibrahim Corrected'), 'PDF should contain the edited recipient name');
  assert.ok(pdfText.includes('Clinical Diagnostics and Biomarker Workshop'), 'PDF should contain the awarded achievement');

  await page.locator('button[title="Sign out of admin"]').click();
  await page.getByRole('button', { name: 'Student Access' }).click();
  await page.getByPlaceholder('e.g. 23/14/0842').fill('23/14/0842');
  await page.getByPlaceholder('Enter portal password').fill('studentpassword123');
  await page.locator('form').filter({ has: page.getByPlaceholder('e.g. 23/14/0842') }).locator('button[type="submit"]').click();
  await page.getByRole('button', { name: 'My Certificates (1)' }).click();
  await page.getByText('Aliyu Ibrahim Corrected', { exact: true }).waitFor();
  await page.getByRole('button', { name: 'Preview & Download PDF' }).click();
  await page.locator('.certificate-artwork').getByText('Clinical Diagnostics and Biomarker Workshop').waitFor();
  const verificationUrl = await page.evaluate(() => JSON.parse(localStorage.getItem('nsbs_certificates') || '[]')[0]?.verificationUrl);
  assert.ok(verificationUrl, 'an issued certificate should have a verification URL');
  await page.goto(verificationUrl, { waitUntil: 'domcontentloaded' });
  await page.getByText('Certificate found in the NSBS registry').waitFor();
  await page.locator('.certificate-artwork-programme').getByText('Clinical Diagnostics and Biomarker Workshop').waitFor();

  assert.deepEqual(pageErrors, [], `browser console errors: ${pageErrors.join('; ')}`);
  console.log('PASS: student photo upload/removal, unlimited custom domain interests, future aspirations, and local persistence');
  console.log('PASS: admin student selection, logo/signature, certificate issue/edit, student access, and verification URL');
  console.log('PASS: landscape A4 certificate PDF with embedded branding, recipient, and achievement');
  console.log(`PDF verified: ${pdfBytes.length} bytes, ${pdfInfo.match(/Page size:.*$/m)?.[0]} (${download.suggestedFilename()})`);
} finally {
  await browser.close();
  await rm(tempDir, { recursive: true, force: true });
}
