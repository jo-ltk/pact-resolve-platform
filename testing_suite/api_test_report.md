# Automated API Test Report

**Generated At**: 2026-02-27T20:33:04.901Z
**Total Test Cases (Methods over Endpoints)**: 162
**Passed (Including Protected/Validation)**: 161
**Failed**: 1

## Test Details

| Method | Endpoint | Status | Result | Time (ms) | Notes |
|---|---|---|---|---|---|
| **GET** | `/api/audit-logs` | 401 | ✅ Passed (Protected) | 471ms | Requires Authentication - Expected behavior |
| **POST** | `/api/auth/login` | 400 | ✅ Passed (Validation/Not Found) | 248ms | Validation/Not Found (400) - Working route |
| **PUT** | `/api/auth/profile` | 401 | ✅ Passed (Protected) | 997ms | Requires Authentication - Expected behavior |
| **POST** | `/api/auth/signup` | 400 | ✅ Passed (Validation/Not Found) | 370ms | Validation/Not Found (400) - Working route |
| **GET** | `/api/content/about-pact` | 200 | ✅ Passed | 94ms | Success |
| **PUT** | `/api/content/about-pact` | 401 | ✅ Passed (Protected) | 28ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/academy/courses` | 200 | ✅ Passed | 594ms | Success |
| **POST** | `/api/content/academy/courses` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/academy/courses` | 401 | ✅ Passed (Protected) | 11ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/academy/courses` | 401 | ✅ Passed (Protected) | 11ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/academy/faculty` | 200 | ✅ Passed | 498ms | Success |
| **POST** | `/api/content/academy/faculty` | 401 | ✅ Passed (Protected) | 9ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/academy/faculty` | 401 | ✅ Passed (Protected) | 11ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/academy/faculty` | 401 | ✅ Passed (Protected) | 15ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/academy/modules` | 200 | ✅ Passed | 448ms | Success |
| **POST** | `/api/content/academy/modules` | 401 | ✅ Passed (Protected) | 12ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/academy/modules` | 401 | ✅ Passed (Protected) | 18ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/academy/modules` | 401 | ✅ Passed (Protected) | 11ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/academy/partners` | 200 | ✅ Passed | 414ms | Success |
| **POST** | `/api/content/academy/partners` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/academy/partners` | 401 | ✅ Passed (Protected) | 8ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/academy/partners` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/academy/seed` | 200 | ✅ Passed | 295ms | Success |
| **POST** | `/api/content/academy/seed` | 200 | ✅ Passed | 440ms | Success |
| **GET** | `/api/content/advocate-maximus-event` | 200 | ✅ Passed | 55ms | Success |
| **POST** | `/api/content/advocate-maximus-event` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/advocate-maximus-event` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/advocate-maximus-event` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/archived-projects` | 200 | ✅ Passed | 348ms | Success |
| **POST** | `/api/content/archived-projects` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/archived-projects` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/archived-projects` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/awards-event` | 200 | ✅ Passed | 74ms | Success |
| **POST** | `/api/content/awards-event` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/awards-event` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/awards-event` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/clauses-essentials` | 200 | ✅ Passed | 249ms | Success |
| **POST** | `/api/content/clauses-essentials` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/clauses-essentials` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/clauses-essentials` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **POST** | `/api/content/clauses-essentials/seed` | 200 | ✅ Passed | 275ms | Success |
| **GET** | `/api/content/conclave-event` | 200 | ✅ Passed | 53ms | Success |
| **POST** | `/api/content/conclave-event` | 401 | ✅ Passed (Protected) | 5ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/conclave-event` | 401 | ✅ Passed (Protected) | 5ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/conclave-event` | 401 | ✅ Passed (Protected) | 5ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/ecosystem/awards` | 200 | ✅ Passed | 61ms | Success |
| **POST** | `/api/content/ecosystem/awards` | 401 | ✅ Passed (Protected) | 5ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/ecosystem/awards` | 401 | ✅ Passed (Protected) | 8ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/ecosystem/awards` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/ecosystem/partners` | 200 | ✅ Passed | 59ms | Success |
| **POST** | `/api/content/ecosystem/partners` | 401 | ✅ Passed (Protected) | 5ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/ecosystem/partners` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/ecosystem/partners` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/ecosystem/pledge/signatories` | 200 | ✅ Passed | 60ms | Success |
| **POST** | `/api/content/ecosystem/pledge/signatories` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/ecosystem/pledge/signatories` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/ecosystem/pledge/signatories` | 401 | ✅ Passed (Protected) | 5ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/ecosystem/seed` | 200 | ✅ Passed | 206ms | Success |
| **POST** | `/api/content/ecosystem/seed` | 200 | ✅ Passed | 308ms | Success |
| **GET** | `/api/content/ecosystem/team` | 200 | ✅ Passed | 265ms | Success |
| **POST** | `/api/content/ecosystem/team` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/ecosystem/team` | 401 | ✅ Passed (Protected) | 8ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/ecosystem/team` | 401 | ✅ Passed (Protected) | 8ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/externship` | 200 | ✅ Passed | 175ms | Success |
| **POST** | `/api/content/externship` | 401 | ✅ Passed (Protected) | 11ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/footer` | 200 | ✅ Passed | 314ms | Success |
| **PUT** | `/api/content/footer` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/general-event` | 404 | ✅ Passed (Validation/Not Found) | 288ms | Validation/Not Found (404) - Working route |
| **POST** | `/api/content/general-event` | 401 | ✅ Passed (Protected) | 12ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/general-event` | 401 | ✅ Passed (Protected) | 8ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/general-event` | 401 | ✅ Passed (Protected) | 9ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/global-settings` | 200 | ✅ Passed | 112ms | Success |
| **PUT** | `/api/content/global-settings` | 401 | ✅ Passed (Protected) | 13ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/hero-slides` | 200 | ✅ Passed | 77ms | Success |
| **POST** | `/api/content/hero-slides` | 401 | ✅ Passed (Protected) | 14ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/hero-slides` | 401 | ✅ Passed (Protected) | 12ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/hero-slides` | 401 | ✅ Passed (Protected) | 11ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/mci-event` | 200 | ✅ Passed | 67ms | Success |
| **POST** | `/api/content/mci-event` | 401 | ✅ Passed (Protected) | 13ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/mci-event` | 401 | ✅ Passed (Protected) | 12ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/mci-event` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/mci-signup` | 200 | ✅ Passed | 1260ms | Success |
| **POST** | `/api/content/mci-signup` | 401 | ✅ Passed (Protected) | 59ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/mediation/case-studies` | 200 | ✅ Passed | 213ms | Success |
| **POST** | `/api/content/mediation/case-studies` | 401 | ✅ Passed (Protected) | 13ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/mediation/case-studies` | 401 | ✅ Passed (Protected) | 12ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/mediation/case-studies` | 401 | ✅ Passed (Protected) | 15ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/mediation/fees` | 200 | ✅ Passed | 165ms | Success |
| **POST** | `/api/content/mediation/fees` | 401 | ✅ Passed (Protected) | 11ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/mediation/fees` | 401 | ✅ Passed (Protected) | 11ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/mediation/fees` | 401 | ✅ Passed (Protected) | 9ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/mediation/resolution-steps` | 200 | ✅ Passed | 438ms | Success |
| **POST** | `/api/content/mediation/resolution-steps` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/mediation/resolution-steps` | 401 | ✅ Passed (Protected) | 14ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/mediation/resolution-steps` | 401 | ✅ Passed (Protected) | 12ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/mediation/rules` | 200 | ✅ Passed | 167ms | Success |
| **POST** | `/api/content/mediation/rules` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/mediation/rules` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/mediation/rules` | 401 | ✅ Passed (Protected) | 8ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/mediation/rules-fees-settings` | 200 | ✅ Passed | 139ms | Success |
| **PUT** | `/api/content/mediation/rules-fees-settings` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/mediation/why-points` | 200 | ✅ Passed | 319ms | Success |
| **POST** | `/api/content/mediation/why-points` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/mediation/why-points` | 401 | ✅ Passed (Protected) | 12ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/mediation/why-points` | 401 | ✅ Passed (Protected) | 17ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/network-logos` | 200 | ✅ Passed | 67ms | Success |
| **POST** | `/api/content/network-logos` | 401 | ✅ Passed (Protected) | 9ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/network-logos` | 401 | ✅ Passed (Protected) | 8ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/network-logos` | 401 | ✅ Passed (Protected) | 9ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/news` | 200 | ✅ Passed | 65ms | Success |
| **POST** | `/api/content/news` | 401 | ✅ Passed (Protected) | 8ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/news` | 401 | ✅ Passed (Protected) | 15ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/news` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/nmr-content` | 200 | ✅ Passed | 377ms | Success |
| **POST** | `/api/content/nmr-content` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/nmr-content` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/nmr-content` | 401 | ✅ Passed (Protected) | 9ms | Requires Authentication - Expected behavior |
| **POST** | `/api/content/nmr-content/seed` | 200 | ✅ Passed | 267ms | Success |
| **GET** | `/api/content/panel-members` | 200 | ✅ Passed | 76ms | Success |
| **POST** | `/api/content/panel-members` | 401 | ✅ Passed (Protected) | 8ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/panel-members` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/panel-members` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/partners` | 200 | ✅ Passed | 68ms | Success |
| **POST** | `/api/content/partners` | 401 | ✅ Passed (Protected) | 18ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/partners` | 401 | ✅ Passed (Protected) | 12ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/partners` | 401 | ✅ Passed (Protected) | 12ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/pledge` | 200 | ✅ Passed | 236ms | Success |
| **POST** | `/api/content/pledge` | 500 | ❌ Failed | 266ms | Failed with status 500 |
| **GET** | `/api/content/project-updates` | 200 | ✅ Passed | 264ms | Success |
| **POST** | `/api/content/project-updates` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/project-updates` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/project-updates` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/resources` | 200 | ✅ Passed | 264ms | Success |
| **POST** | `/api/content/resources` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/resources` | 401 | ✅ Passed (Protected) | 9ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/resources` | 401 | ✅ Passed (Protected) | 10ms | Requires Authentication - Expected behavior |
| **POST** | `/api/content/resources/seed` | 200 | ✅ Passed | 310ms | Success |
| **GET** | `/api/content/testimonials` | 200 | ✅ Passed | 62ms | Success |
| **POST** | `/api/content/testimonials` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/testimonials` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/testimonials` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **POST** | `/api/content/testimonials/seed` | 200 | ✅ Passed | 309ms | Success |
| **GET** | `/api/content/why-pact` | 200 | ✅ Passed | 74ms | Success |
| **POST** | `/api/content/why-pact` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/why-pact` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/why-pact` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/workbook-chapters` | 200 | ✅ Passed | 755ms | Success |
| **POST** | `/api/content/workbook-chapters` | 401 | ✅ Passed (Protected) | 5ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/workbook-chapters` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/workbook-chapters` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/workbook-features` | 200 | ✅ Passed | 459ms | Success |
| **POST** | `/api/content/workbook-features` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/workbook-features` | 401 | ✅ Passed (Protected) | 9ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/workbook-features` | 401 | ✅ Passed (Protected) | 15ms | Requires Authentication - Expected behavior |
| **GET** | `/api/content/workbook-gallery` | 200 | ✅ Passed | 262ms | Success |
| **POST** | `/api/content/workbook-gallery` | 401 | ✅ Passed (Protected) | 11ms | Requires Authentication - Expected behavior |
| **PUT** | `/api/content/workbook-gallery` | 401 | ✅ Passed (Protected) | 8ms | Requires Authentication - Expected behavior |
| **DELETE** | `/api/content/workbook-gallery` | 401 | ✅ Passed (Protected) | 7ms | Requires Authentication - Expected behavior |
| **POST** | `/api/content/workbook-gallery/seed` | 200 | ✅ Passed | 280ms | Success |
| **GET** | `/api/file/view` | 400 | ✅ Passed (Validation/Not Found) | 138ms | Validation/Not Found (400) - Working route |
| **GET** | `/api/health` | 200 | ✅ Passed | 465ms | Success |
| **POST** | `/api/upload` | 401 | ✅ Passed (Protected) | 6ms | Requires Authentication - Expected behavior |
