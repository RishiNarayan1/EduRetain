// DOR (Dropout Rate) Data Parser Utility

// Raw CSV data as parsed array
export const dorRawData = [
  { state: "A & N Islands", year: "2012-13", Primary_Boys: 0.83, Primary_Girls: 0.51, Primary_Total: 0.68, UpperPrimary_Boys: null, UpperPrimary_Girls: 1.09, UpperPrimary_Total: 1.23, Secondary_Boys: 5.57, Secondary_Girls: 5.55, Secondary_Total: 5.56, HrSecondary_Boys: 17.66, HrSecondary_Girls: 10.15, HrSecondary_Total: 14.14 },
  { state: "A & N Islands", year: "2013-14", Primary_Boys: 1.35, Primary_Girls: 1.06, Primary_Total: 1.21, UpperPrimary_Boys: null, UpperPrimary_Girls: 1.54, UpperPrimary_Total: 0.51, Secondary_Boys: 8.36, Secondary_Girls: 5.98, Secondary_Total: 7.2, HrSecondary_Boys: 18.94, HrSecondary_Girls: 12.2, HrSecondary_Total: 15.87 },
  { state: "A & N Islands", year: "2014-15", Primary_Boys: 0.47, Primary_Girls: 0.55, Primary_Total: 0.51, UpperPrimary_Boys: 1.44, UpperPrimary_Girls: 1.95, UpperPrimary_Total: 1.69, Secondary_Boys: 11.47, Secondary_Girls: 8.16, Secondary_Total: 9.87, HrSecondary_Boys: 21.05, HrSecondary_Girls: 12.21, HrSecondary_Total: 16.93 },
  { state: "Andhra Pradesh", year: "2012-13", Primary_Boys: 3.3, Primary_Girls: 3.05, Primary_Total: 3.18, UpperPrimary_Boys: 3.21, UpperPrimary_Girls: 3.51, UpperPrimary_Total: 3.36, Secondary_Boys: 12.21, Secondary_Girls: 13.25, Secondary_Total: 12.72, HrSecondary_Boys: 2.66, HrSecondary_Girls: null, HrSecondary_Total: 0.35 },
  { state: "Andhra Pradesh", year: "2013-14", Primary_Boys: 4.31, Primary_Girls: 4.39, Primary_Total: 4.35, UpperPrimary_Boys: 3.46, UpperPrimary_Girls: 4.12, UpperPrimary_Total: 3.78, Secondary_Boys: 11.95, Secondary_Girls: 13.37, Secondary_Total: 12.65, HrSecondary_Boys: 12.65, HrSecondary_Girls: 10.85, HrSecondary_Total: 11.79 },
  { state: "Andhra Pradesh", year: "2014-15", Primary_Boys: 6.57, Primary_Girls: 6.89, Primary_Total: 6.72, UpperPrimary_Boys: 5.09, UpperPrimary_Girls: 5.32, UpperPrimary_Total: 5.2, Secondary_Boys: 15.81, Secondary_Girls: 15.6, Secondary_Total: 15.71, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Arunachal Pradesh", year: "2012-13", Primary_Boys: 15.84, Primary_Girls: 14.44, Primary_Total: 15.16, UpperPrimary_Boys: 5.86, UpperPrimary_Girls: 9.06, UpperPrimary_Total: 7.47, Secondary_Boys: 13.99, Secondary_Girls: 11.77, Secondary_Total: 12.93, HrSecondary_Boys: 7.85, HrSecondary_Girls: 2.14, HrSecondary_Total: 5.11 },
  { state: "Arunachal Pradesh", year: "2013-14", Primary_Boys: 11.54, Primary_Girls: 10.22, Primary_Total: 10.89, UpperPrimary_Boys: 4.44, UpperPrimary_Girls: 6.74, UpperPrimary_Total: 5.59, Secondary_Boys: 16.08, Secondary_Girls: 12.75, Secondary_Total: 14.49, HrSecondary_Boys: 18.57, HrSecondary_Girls: 15.49, HrSecondary_Total: 17.07 },
  { state: "Arunachal Pradesh", year: "2014-15", Primary_Boys: 11.51, Primary_Girls: 10.09, Primary_Total: 10.82, UpperPrimary_Boys: 5.31, UpperPrimary_Girls: 8.08, UpperPrimary_Total: 6.71, Secondary_Boys: 18.33, Secondary_Girls: 15.81, Secondary_Total: 17.11, HrSecondary_Boys: 19.37, HrSecondary_Girls: 17.44, HrSecondary_Total: 18.42 },
  { state: "Assam", year: "2012-13", Primary_Boys: 7.02, Primary_Girls: 5.46, Primary_Total: 6.24, UpperPrimary_Boys: 7.89, UpperPrimary_Girls: 6.55, UpperPrimary_Total: 7.2, Secondary_Boys: 25.65, Secondary_Girls: 27.79, Secondary_Total: 26.77, HrSecondary_Boys: 4.87, HrSecondary_Girls: 4.5, HrSecondary_Total: 4.69 },
  { state: "Assam", year: "2013-14", Primary_Boys: 8.19, Primary_Girls: 6.68, Primary_Total: 7.44, UpperPrimary_Boys: 7.6, UpperPrimary_Girls: 6.54, UpperPrimary_Total: 7.05, Secondary_Boys: 28.59, Secondary_Girls: 32.1, Secondary_Total: 30.43, HrSecondary_Boys: 7.62, HrSecondary_Girls: 6.83, HrSecondary_Total: 7.24 },
  { state: "Assam", year: "2014-15", Primary_Boys: 16.07, Primary_Girls: 14.65, Primary_Total: 15.36, UpperPrimary_Boys: 10.45, UpperPrimary_Girls: 10.56, UpperPrimary_Total: 10.51, Secondary_Boys: 24.64, Secondary_Girls: 29.28, Secondary_Total: 27.06, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Bihar", year: "2012-13", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: null, UpperPrimary_Girls: null, UpperPrimary_Total: null, Secondary_Boys: 29.11, Secondary_Girls: 31.28, Secondary_Total: 30.14, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Bihar", year: "2013-14", Primary_Boys: 2.38, Primary_Girls: 1.79, Primary_Total: 2.09, UpperPrimary_Boys: 2.77, UpperPrimary_Girls: 3.19, UpperPrimary_Total: 2.98, Secondary_Boys: 24.67, Secondary_Girls: 26.05, Secondary_Total: 25.33, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Bihar", year: "2014-15", Primary_Boys: 0.35, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: 4.14, UpperPrimary_Girls: 4.01, UpperPrimary_Total: 4.08, Secondary_Boys: 25.21, Secondary_Girls: 26.62, Secondary_Total: 25.9, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Chandigarh", year: "2012-13", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: null, UpperPrimary_Girls: 0.88, UpperPrimary_Total: 0.1, Secondary_Boys: null, Secondary_Girls: null, Secondary_Total: null, HrSecondary_Boys: 16.32, HrSecondary_Girls: 10.09, HrSecondary_Total: 13.65 },
  { state: "Chandigarh", year: "2013-14", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: 0.72, UpperPrimary_Girls: 1.55, UpperPrimary_Total: 1.08, Secondary_Boys: null, Secondary_Girls: null, Secondary_Total: null, HrSecondary_Boys: 13.24, HrSecondary_Girls: 8.49, HrSecondary_Total: 11.28 },
  { state: "Chandigarh", year: "2014-15", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: 0.01, UpperPrimary_Girls: 0.96, UpperPrimary_Total: 0.44, Secondary_Boys: null, Secondary_Girls: null, Secondary_Total: null, HrSecondary_Boys: 12.1, HrSecondary_Girls: 8.41, HrSecondary_Total: 10.55 },
  { state: "Chhattisgarh", year: "2012-13", Primary_Boys: 4.24, Primary_Girls: 4.05, Primary_Total: 4.14, UpperPrimary_Boys: 6.09, UpperPrimary_Girls: 4.73, UpperPrimary_Total: 5.42, Secondary_Boys: 14.82, Secondary_Girls: 14.89, Secondary_Total: 14.86, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Chhattisgarh", year: "2013-14", Primary_Boys: 1.45, Primary_Girls: 1.38, Primary_Total: 1.42, UpperPrimary_Boys: 4.09, UpperPrimary_Girls: 3.51, UpperPrimary_Total: 3.8, Secondary_Boys: 24.1, Secondary_Girls: 22.72, Secondary_Total: 23.41, HrSecondary_Boys: null, HrSecondary_Girls: 2.13, HrSecondary_Total: null },
  { state: "Chhattisgarh", year: "2014-15", Primary_Boys: 3.08, Primary_Girls: 2.74, Primary_Total: 2.91, UpperPrimary_Boys: 6.47, UpperPrimary_Girls: 5.22, UpperPrimary_Total: 5.85, Secondary_Boys: 22.62, Secondary_Girls: 19.92, Secondary_Total: 21.26, HrSecondary_Boys: 1.37, HrSecondary_Girls: 4.14, HrSecondary_Total: 2.76 },
  { state: "Delhi", year: "2012-13", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: null, UpperPrimary_Girls: 0.31, UpperPrimary_Total: null, Secondary_Boys: 6.26, Secondary_Girls: 4.21, Secondary_Total: 5.32, HrSecondary_Boys: 18.56, HrSecondary_Girls: 9.6, HrSecondary_Total: 14.47 },
  { state: "Delhi", year: "2013-14", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: 3.13, UpperPrimary_Girls: 2.37, UpperPrimary_Total: 2.78, Secondary_Boys: 10.8, Secondary_Girls: 6.64, Secondary_Total: 8.9, HrSecondary_Boys: 20.28, HrSecondary_Girls: 11.45, HrSecondary_Total: 16.25 },
  { state: "Delhi", year: "2014-15", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: 0.95, UpperPrimary_Girls: 0.55, UpperPrimary_Total: 0.76, Secondary_Boys: 13.55, Secondary_Girls: 9.8, Secondary_Total: 11.81, HrSecondary_Boys: 20.91, HrSecondary_Girls: 13.15, HrSecondary_Total: 17.32 },
  { state: "Goa", year: "2012-13", Primary_Boys: null, Primary_Girls: 0.26, Primary_Total: null, UpperPrimary_Boys: null, UpperPrimary_Girls: null, UpperPrimary_Total: null, Secondary_Boys: 9.49, Secondary_Girls: 6.26, Secondary_Total: 7.96, HrSecondary_Boys: 16.01, HrSecondary_Girls: 5.8, HrSecondary_Total: 11.26 },
  { state: "Goa", year: "2013-14", Primary_Boys: 0.08, Primary_Girls: 0.33, Primary_Total: 0.2, UpperPrimary_Boys: null, UpperPrimary_Girls: null, UpperPrimary_Total: null, Secondary_Boys: 11.68, Secondary_Girls: 7.19, Secondary_Total: 9.58, HrSecondary_Boys: 18.21, HrSecondary_Girls: 8.38, HrSecondary_Total: 13.36 },
  { state: "Goa", year: "2014-15", Primary_Boys: 0.63, Primary_Girls: 0.84, Primary_Total: 0.73, UpperPrimary_Boys: null, UpperPrimary_Girls: 0.21, UpperPrimary_Total: 0.07, Secondary_Boys: 14.15, Secondary_Girls: 7.68, Secondary_Total: 11.15, HrSecondary_Boys: 18.27, HrSecondary_Girls: 9.39, HrSecondary_Total: 13.91 },
  { state: "Gujarat", year: "2012-13", Primary_Boys: 0.21, Primary_Girls: 1.35, Primary_Total: 0.74, UpperPrimary_Boys: 2.75, UpperPrimary_Girls: 8.19, UpperPrimary_Total: 5.2, Secondary_Boys: 13.96, Secondary_Girls: 12.95, Secondary_Total: 13.55, HrSecondary_Boys: 0.58, HrSecondary_Girls: 0.3, HrSecondary_Total: 0.46 },
  { state: "Gujarat", year: "2013-14", Primary_Boys: 0.5, Primary_Girls: 1.06, Primary_Total: 0.76, UpperPrimary_Boys: 3.52, UpperPrimary_Girls: 8.04, UpperPrimary_Total: 5.55, Secondary_Boys: 22.85, Secondary_Girls: 19.81, Secondary_Total: 21.61, HrSecondary_Boys: 9.06, HrSecondary_Girls: 6.18, HrSecondary_Total: 7.83 },
  { state: "Gujarat", year: "2014-15", Primary_Boys: 0.82, Primary_Girls: 0.98, Primary_Total: 0.89, UpperPrimary_Boys: 4.65, UpperPrimary_Girls: 8.54, UpperPrimary_Total: 6.41, Secondary_Boys: 26.29, Secondary_Girls: 23.24, Secondary_Total: 25.04, HrSecondary_Boys: 8.4, HrSecondary_Girls: 5.26, HrSecondary_Total: 7.04 },
  { state: "Haryana", year: "2012-13", Primary_Boys: 1.48, Primary_Girls: 1.06, Primary_Total: 1.29, UpperPrimary_Boys: 0.18, UpperPrimary_Girls: 0.8, UpperPrimary_Total: 0.46, Secondary_Boys: 8.22, Secondary_Girls: 9.93, Secondary_Total: 8.98, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Haryana", year: "2013-14", Primary_Boys: 0.22, Primary_Girls: 0.63, Primary_Total: 0.41, UpperPrimary_Boys: 1.97, UpperPrimary_Girls: 3.25, UpperPrimary_Total: 2.55, Secondary_Boys: 11.92, Secondary_Girls: 13.27, Secondary_Total: 12.51, HrSecondary_Boys: 1.41, HrSecondary_Girls: 3.16, HrSecondary_Total: 2.18 },
  { state: "Haryana", year: "2014-15", Primary_Boys: 5.54, Primary_Girls: 5.69, Primary_Total: 5.61, UpperPrimary_Boys: 5.5, UpperPrimary_Girls: 6.18, UpperPrimary_Total: 5.81, Secondary_Boys: 16.35, Secondary_Girls: 15.3, Secondary_Total: 15.89, HrSecondary_Boys: 6.24, HrSecondary_Girls: 5.12, HrSecondary_Total: 5.75 },
  { state: "Himachal Pradesh", year: "2012-13", Primary_Boys: 0.51, Primary_Girls: 0.39, Primary_Total: 0.45, UpperPrimary_Boys: 0.52, UpperPrimary_Girls: 0.49, UpperPrimary_Total: 0.51, Secondary_Boys: 8.35, Secondary_Girls: 8.4, Secondary_Total: 8.37, HrSecondary_Boys: 10.25, HrSecondary_Girls: 7.64, HrSecondary_Total: 9.02 },
  { state: "Himachal Pradesh", year: "2013-14", Primary_Boys: 0.57, Primary_Girls: 0.34, Primary_Total: 0.46, UpperPrimary_Boys: 0.6, UpperPrimary_Girls: 0.98, UpperPrimary_Total: 0.78, Secondary_Boys: 9.32, Secondary_Girls: 8.83, Secondary_Total: 9.09, HrSecondary_Boys: 8.44, HrSecondary_Girls: 5.54, HrSecondary_Total: 7.07 },
  { state: "Himachal Pradesh", year: "2014-15", Primary_Boys: 0.46, Primary_Girls: 0.83, Primary_Total: 0.64, UpperPrimary_Boys: 0.5, UpperPrimary_Girls: 1.27, UpperPrimary_Total: 0.87, Secondary_Boys: 6.31, Secondary_Girls: 5.8, Secondary_Total: 6.07, HrSecondary_Boys: 9.02, HrSecondary_Girls: 5.57, HrSecondary_Total: 7.41 },
  { state: "Jammu & Kashmir", year: "2012-13", Primary_Boys: 6.8, Primary_Girls: 5.75, Primary_Total: 6.3, UpperPrimary_Boys: 5.51, UpperPrimary_Girls: 5.52, UpperPrimary_Total: 5.52, Secondary_Boys: 16.79, Secondary_Girls: 17.96, Secondary_Total: 17.33, HrSecondary_Boys: 11.69, HrSecondary_Girls: 9.36, HrSecondary_Total: 10.66 },
  { state: "Jammu & Kashmir", year: "2013-14", Primary_Boys: 5.53, Primary_Girls: 5.37, Primary_Total: 5.46, UpperPrimary_Boys: 3.86, UpperPrimary_Girls: 4.8, UpperPrimary_Total: 4.3, Secondary_Boys: 14.7, Secondary_Girls: 16.14, Secondary_Total: 15.36, HrSecondary_Boys: 8.8, HrSecondary_Girls: 6.2, HrSecondary_Total: 7.64 },
  { state: "Jammu & Kashmir", year: "2014-15", Primary_Boys: 6.98, Primary_Girls: 6.59, Primary_Total: 6.79, UpperPrimary_Boys: 4.98, UpperPrimary_Girls: 5.95, UpperPrimary_Total: 5.44, Secondary_Boys: 16.97, Secondary_Girls: 17.65, Secondary_Total: 17.28, HrSecondary_Boys: 13.85, HrSecondary_Girls: 11.2, HrSecondary_Total: 12.65 },
  { state: "Jharkhand", year: "2012-13", Primary_Boys: 7.36, Primary_Girls: 7.05, Primary_Total: 7.21, UpperPrimary_Boys: 4.99, UpperPrimary_Girls: 5.94, UpperPrimary_Total: 5.47, Secondary_Boys: 17.84, Secondary_Girls: 19.2, Secondary_Total: 18.5, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Jharkhand", year: "2013-14", Primary_Boys: 6.89, Primary_Girls: 5.91, Primary_Total: 6.41, UpperPrimary_Boys: 7.19, UpperPrimary_Girls: 7.65, UpperPrimary_Total: 7.42, Secondary_Boys: 22.99, Secondary_Girls: 23.32, Secondary_Total: 23.15, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Jharkhand", year: "2014-15", Primary_Boys: 5.91, Primary_Girls: 5.03, Primary_Total: 5.48, UpperPrimary_Boys: 9.01, UpperPrimary_Girls: 8.96, UpperPrimary_Total: 8.99, Secondary_Boys: 23.45, Secondary_Girls: 24.56, Secondary_Total: 24, HrSecondary_Boys: 2.72, HrSecondary_Girls: 4.18, HrSecondary_Total: 3.41 },
  { state: "Karnataka", year: "2012-13", Primary_Boys: 3.4, Primary_Girls: 2.51, Primary_Total: 2.97, UpperPrimary_Boys: 4.96, UpperPrimary_Girls: 5.15, UpperPrimary_Total: 5.05, Secondary_Boys: 40.7, Secondary_Girls: 39.07, Secondary_Total: 39.92, HrSecondary_Boys: 19.47, HrSecondary_Girls: 11.26, HrSecondary_Total: 15.33 },
  { state: "Karnataka", year: "2013-14", Primary_Boys: 2.42, Primary_Girls: 2.21, Primary_Total: 2.32, UpperPrimary_Boys: 2.31, UpperPrimary_Girls: 2.73, UpperPrimary_Total: 2.51, Secondary_Boys: 28.49, Secondary_Girls: 26.57, Secondary_Total: 27.57, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Karnataka", year: "2014-15", Primary_Boys: 2.03, Primary_Girls: 2.01, Primary_Total: 2.02, UpperPrimary_Boys: 3.46, UpperPrimary_Girls: 4.27, UpperPrimary_Total: 3.85, Secondary_Boys: 27.71, Secondary_Girls: 24.52, Secondary_Total: 26.18, HrSecondary_Boys: 5.97, HrSecondary_Girls: null, HrSecondary_Total: 1.96 },
  { state: "Kerala", year: "2012-13", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: null, UpperPrimary_Girls: null, UpperPrimary_Total: null, Secondary_Boys: 12.31, Secondary_Girls: 6.38, Secondary_Total: 9.45, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Kerala", year: "2013-14", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: null, UpperPrimary_Girls: null, UpperPrimary_Total: null, Secondary_Boys: 17.3, Secondary_Girls: 11.4, Secondary_Total: 14.46, HrSecondary_Boys: 6.95, HrSecondary_Girls: 5.9, HrSecondary_Total: 6.4 },
  { state: "Kerala", year: "2014-15", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: null, UpperPrimary_Girls: 0, UpperPrimary_Total: null, Secondary_Boys: 14.96, Secondary_Girls: 9.52, Secondary_Total: 12.32, HrSecondary_Boys: 1.54, HrSecondary_Girls: null, HrSecondary_Total: 0.47 },
  { state: "Madhya Pradesh", year: "2012-13", Primary_Boys: 5.75, Primary_Girls: 6.49, Primary_Total: 6.11, UpperPrimary_Boys: 6.79, UpperPrimary_Girls: 10.27, UpperPrimary_Total: 8.53, Secondary_Boys: 11.16, Secondary_Girls: 16.39, Secondary_Total: 13.63, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Madhya Pradesh", year: "2013-14", Primary_Boys: 9.91, Primary_Girls: 10.4, Primary_Total: 10.14, UpperPrimary_Boys: 9.88, UpperPrimary_Girls: 13.57, UpperPrimary_Total: 11.7, Secondary_Boys: 25.21, Secondary_Girls: 27.91, Secondary_Total: 26.47, HrSecondary_Boys: 0.52, HrSecondary_Girls: 2.83, HrSecondary_Total: 1.55 },
  { state: "Madhya Pradesh", year: "2014-15", Primary_Boys: 6.48, Primary_Girls: 6.72, Primary_Total: 6.59, UpperPrimary_Boys: 7.78, UpperPrimary_Girls: 10.7, UpperPrimary_Total: 9.2, Secondary_Boys: 23.71, Secondary_Girls: 25.97, Secondary_Total: 24.77, HrSecondary_Boys: null, HrSecondary_Girls: 0.73, HrSecondary_Total: null },
  { state: "Maharashtra", year: "2012-13", Primary_Boys: 0.88, Primary_Girls: 1.06, Primary_Total: 0.97, UpperPrimary_Boys: 0.89, UpperPrimary_Girls: 2.72, UpperPrimary_Total: 1.74, Secondary_Boys: 16.61, Secondary_Girls: 15.72, Secondary_Total: 16.2, HrSecondary_Boys: 2.55, HrSecondary_Girls: 3.94, HrSecondary_Total: 3.2 },
  { state: "Maharashtra", year: "2013-14", Primary_Boys: 0.51, Primary_Girls: 0.59, Primary_Total: 0.55, UpperPrimary_Boys: null, UpperPrimary_Girls: 1.5, UpperPrimary_Total: 0.61, Secondary_Boys: 15.04, Secondary_Girls: 13.78, Secondary_Total: 14.47, HrSecondary_Boys: 2.85, HrSecondary_Girls: 3.89, HrSecondary_Total: 3.34 },
  { state: "Maharashtra", year: "2014-15", Primary_Boys: 1.26, Primary_Girls: 1.25, Primary_Total: 1.26, UpperPrimary_Boys: 0.89, UpperPrimary_Girls: 2.83, UpperPrimary_Total: 1.79, Secondary_Boys: 13.11, Secondary_Girls: 12.58, Secondary_Total: 12.87, HrSecondary_Boys: 2.02, HrSecondary_Girls: 1.6, HrSecondary_Total: 1.83 },
  { state: "Manipur", year: "2012-13", Primary_Boys: 10.24, Primary_Girls: 9.48, Primary_Total: 9.86, UpperPrimary_Boys: 5.48, UpperPrimary_Girls: 6.65, UpperPrimary_Total: 6.06, Secondary_Boys: 8.16, Secondary_Girls: 11.35, Secondary_Total: 9.75, HrSecondary_Boys: 5.96, HrSecondary_Girls: 10.06, HrSecondary_Total: 7.93 },
  { state: "Manipur", year: "2013-14", Primary_Boys: 17.27, Primary_Girls: 18.74, Primary_Total: 18, UpperPrimary_Boys: 7.48, UpperPrimary_Girls: 6.54, UpperPrimary_Total: 7.02, Secondary_Boys: 12.35, Secondary_Girls: 15.28, Secondary_Total: 13.81, HrSecondary_Boys: 3.3, HrSecondary_Girls: 3.08, HrSecondary_Total: 3.2 },
  { state: "Manipur", year: "2014-15", Primary_Boys: 9.5, Primary_Girls: 9.83, Primary_Total: 9.66, UpperPrimary_Boys: 3.61, UpperPrimary_Girls: 4.8, UpperPrimary_Total: 4.2, Secondary_Boys: 12.94, Secondary_Girls: 15.86, Secondary_Total: 14.38, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Meghalaya", year: "2012-13", Primary_Boys: 11.32, Primary_Girls: 8.96, Primary_Total: 10.14, UpperPrimary_Boys: 8.43, UpperPrimary_Girls: 7.34, UpperPrimary_Total: 7.85, Secondary_Boys: 27.21, Secondary_Girls: 25.02, Secondary_Total: 26.03, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Meghalaya", year: "2013-14", Primary_Boys: 11.3, Primary_Girls: 9.39, Primary_Total: 10.34, UpperPrimary_Boys: 6.34, UpperPrimary_Girls: 7.28, UpperPrimary_Total: 6.84, Secondary_Boys: 25.63, Secondary_Girls: 23.99, Secondary_Total: 24.75, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Meghalaya", year: "2014-15", Primary_Boys: 10.35, Primary_Girls: 8.56, Primary_Total: 9.46, UpperPrimary_Boys: 6.77, UpperPrimary_Girls: 6.3, UpperPrimary_Total: 6.52, Secondary_Boys: 20.8, Secondary_Girls: 20.27, Secondary_Total: 20.52, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Mizoram", year: "2012-13", Primary_Boys: 24.27, Primary_Girls: 23.93, Primary_Total: 24.11, UpperPrimary_Boys: 19.35, UpperPrimary_Girls: 19.21, UpperPrimary_Total: 19.28, Secondary_Boys: 22.18, Secondary_Girls: 20.65, Secondary_Total: 21.42, HrSecondary_Boys: 2.91, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Mizoram", year: "2013-14", Primary_Boys: 12.57, Primary_Girls: 13.38, Primary_Total: 12.96, UpperPrimary_Boys: 6.61, UpperPrimary_Girls: 5.39, UpperPrimary_Total: 6.02, Secondary_Boys: 20, Secondary_Girls: 17.37, Secondary_Total: 18.7, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Mizoram", year: "2014-15", Primary_Boys: 10.17, Primary_Girls: 10.03, Primary_Total: 10.1, UpperPrimary_Boys: 5.46, UpperPrimary_Girls: 4.06, UpperPrimary_Total: 4.78, Secondary_Boys: 23.02, Secondary_Girls: 20.73, Secondary_Total: 21.88, HrSecondary_Boys: 9, HrSecondary_Girls: 4.85, HrSecondary_Total: 6.91 },
  { state: "Nagaland", year: "2012-13", Primary_Boys: 7.11, Primary_Girls: 7.03, Primary_Total: 7.07, UpperPrimary_Boys: 10.15, UpperPrimary_Girls: 9.51, UpperPrimary_Total: 9.83, Secondary_Boys: 26.7, Secondary_Girls: 26.33, Secondary_Total: 26.51, HrSecondary_Boys: 18.67, HrSecondary_Girls: 17.87, HrSecondary_Total: 18.29 },
  { state: "Nagaland", year: "2013-14", Primary_Boys: 19.09, Primary_Girls: 19.74, Primary_Total: 19.41, UpperPrimary_Boys: 18.08, UpperPrimary_Girls: 17.63, UpperPrimary_Total: 17.86, Secondary_Boys: 34.14, Secondary_Girls: 36.08, Secondary_Total: 35.11, HrSecondary_Boys: 15.36, HrSecondary_Girls: 12.96, HrSecondary_Total: 14.19 },
  { state: "Nagaland", year: "2014-15", Primary_Boys: 6.18, Primary_Girls: 5.02, Primary_Total: 5.61, UpperPrimary_Boys: 7.87, UpperPrimary_Girls: 7.97, UpperPrimary_Total: 7.92, Secondary_Boys: 17.98, Secondary_Girls: 18.47, Secondary_Total: 18.23, HrSecondary_Boys: 10.36, HrSecondary_Girls: 3.19, HrSecondary_Total: 6.97 },
  { state: "Odisha", year: "2012-13", Primary_Boys: 3.63, Primary_Girls: 3.49, Primary_Total: 3.56, UpperPrimary_Boys: 4.1, UpperPrimary_Girls: 3.52, UpperPrimary_Total: 3.81, Secondary_Boys: 50.09, Secondary_Girls: 49.62, Secondary_Total: 49.86, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Odisha", year: "2013-14", Primary_Boys: 2.83, Primary_Girls: 3.05, Primary_Total: 2.94, UpperPrimary_Boys: 3.11, UpperPrimary_Girls: 2.48, UpperPrimary_Total: 2.8, Secondary_Boys: 49.39, Secondary_Girls: 49.57, Secondary_Total: 49.48, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Odisha", year: "2014-15", Primary_Boys: 2.91, Primary_Girls: 2.81, Primary_Total: 2.86, UpperPrimary_Boys: 4.11, UpperPrimary_Girls: 3.49, UpperPrimary_Total: 3.81, Secondary_Boys: 29.74, Secondary_Girls: 29.37, Secondary_Total: 29.56, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Puducherry", year: "2012-13", Primary_Boys: 0.25, Primary_Girls: 0.43, Primary_Total: 0.34, UpperPrimary_Boys: 0.33, UpperPrimary_Girls: 1.05, UpperPrimary_Total: 0.68, Secondary_Boys: 18.49, Secondary_Girls: 11.72, Secondary_Total: 15.21, HrSecondary_Boys: 6.79, HrSecondary_Girls: 3.87, HrSecondary_Total: 5.25 },
  { state: "Puducherry", year: "2013-14", Primary_Boys: 0.76, Primary_Girls: 0.57, Primary_Total: 0.66, UpperPrimary_Boys: 0.37, UpperPrimary_Girls: 0.83, UpperPrimary_Total: 0.6, Secondary_Boys: 18.22, Secondary_Girls: 10.02, Secondary_Total: 14.24, HrSecondary_Boys: 13.24, HrSecondary_Girls: 9.28, HrSecondary_Total: 11.16 },
  { state: "Puducherry", year: "2014-15", Primary_Boys: 0.36, Primary_Girls: 0.38, Primary_Total: 0.37, UpperPrimary_Boys: 0.44, UpperPrimary_Girls: 0.69, UpperPrimary_Total: 0.56, Secondary_Boys: 14.94, Secondary_Girls: 9.36, Secondary_Total: 12.19, HrSecondary_Boys: 5.4, HrSecondary_Girls: 3.69, HrSecondary_Total: 4.5 },
  { state: "Punjab", year: "2012-13", Primary_Boys: 1.99, Primary_Girls: 1.98, Primary_Total: 1.99, UpperPrimary_Boys: 2.58, UpperPrimary_Girls: 3.04, UpperPrimary_Total: 2.78, Secondary_Boys: 9.4, Secondary_Girls: 10.3, Secondary_Total: 9.8, HrSecondary_Boys: 9.69, HrSecondary_Girls: 6.53, HrSecondary_Total: 8.28 },
  { state: "Punjab", year: "2013-14", Primary_Boys: 1.35, Primary_Girls: 1.21, Primary_Total: 1.29, UpperPrimary_Boys: 2.52, UpperPrimary_Girls: 3.27, UpperPrimary_Total: 2.85, Secondary_Boys: 8.93, Secondary_Girls: 8.71, Secondary_Total: 8.83, HrSecondary_Boys: 7.87, HrSecondary_Girls: 3.2, HrSecondary_Total: 5.81 },
  { state: "Punjab", year: "2014-15", Primary_Boys: 2.89, Primary_Girls: 3.25, Primary_Total: 3.05, UpperPrimary_Boys: 2.95, UpperPrimary_Girls: 3.55, UpperPrimary_Total: 3.22, Secondary_Boys: 9.22, Secondary_Girls: 8.39, Secondary_Total: 8.86, HrSecondary_Boys: 7.52, HrSecondary_Girls: 3.67, HrSecondary_Total: 5.83 },
  { state: "Rajasthan", year: "2012-13", Primary_Boys: 7.2, Primary_Girls: 8.85, Primary_Total: 7.97, UpperPrimary_Boys: 2.86, UpperPrimary_Girls: 6.34, UpperPrimary_Total: 4.42, Secondary_Boys: 13.06, Secondary_Girls: 14.49, Secondary_Total: 13.65, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Rajasthan", year: "2013-14", Primary_Boys: 7.76, Primary_Girls: 9.12, Primary_Total: 8.39, UpperPrimary_Boys: 4.49, UpperPrimary_Girls: 7.95, UpperPrimary_Total: 6.03, Secondary_Boys: 17.85, Secondary_Girls: 20.06, Secondary_Total: 18.77, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Rajasthan", year: "2014-15", Primary_Boys: 5.02, Primary_Girls: 5.02, Primary_Total: 5.02, UpperPrimary_Boys: 2.54, UpperPrimary_Girls: 3.73, UpperPrimary_Total: 3.07, Secondary_Boys: 13.54, Secondary_Girls: 13.4, Secondary_Total: 13.48, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Sikkim", year: "2012-13", Primary_Boys: 4.78, Primary_Girls: 2.31, Primary_Total: 3.6, UpperPrimary_Boys: 2.6, UpperPrimary_Girls: 3.64, UpperPrimary_Total: 3.15, Secondary_Boys: 9.93, Secondary_Girls: 8.64, Secondary_Total: 9.23, HrSecondary_Boys: 11.79, HrSecondary_Girls: 4.92, HrSecondary_Total: 8.1 },
  { state: "Sikkim", year: "2013-14", Primary_Boys: 5.55, Primary_Girls: 3.49, Primary_Total: 4.57, UpperPrimary_Boys: 6.35, UpperPrimary_Girls: 3.98, UpperPrimary_Total: 5.14, Secondary_Boys: 13.74, Secondary_Girls: 12.14, Secondary_Total: 12.89, HrSecondary_Boys: 14.11, HrSecondary_Girls: 11.92, HrSecondary_Total: 12.91 },
  { state: "Sikkim", year: "2014-15", Primary_Boys: 3.75, Primary_Girls: 0.62, Primary_Total: 2.27, UpperPrimary_Boys: 2.07, UpperPrimary_Girls: 1.08, UpperPrimary_Total: 1.57, Secondary_Boys: 17.58, Secondary_Girls: 14.39, Secondary_Total: 15.89, HrSecondary_Boys: 12.48, HrSecondary_Girls: 11.17, HrSecondary_Total: 11.76 },
  { state: "Tamil Nadu", year: "2012-13", Primary_Boys: 4.02, Primary_Girls: 4.1, Primary_Total: 4.06, UpperPrimary_Boys: 0.38, UpperPrimary_Girls: 2.13, UpperPrimary_Total: 1.24, Secondary_Boys: 14.26, Secondary_Girls: 5.86, Secondary_Total: 10.2, HrSecondary_Boys: 1.34, HrSecondary_Girls: 2.33, HrSecondary_Total: 1.87 },
  { state: "Tamil Nadu", year: "2013-14", Primary_Boys: 0.53, Primary_Girls: 0.39, Primary_Total: 0.46, UpperPrimary_Boys: 4.38, UpperPrimary_Girls: 4.67, UpperPrimary_Total: 4.52, Secondary_Boys: 16.13, Secondary_Girls: 7.99, Secondary_Total: 12.2, HrSecondary_Boys: 4.55, HrSecondary_Girls: 4.35, HrSecondary_Total: 4.44 },
  { state: "Tamil Nadu", year: "2014-15", Primary_Boys: null, Primary_Girls: null, Primary_Total: null, UpperPrimary_Boys: null, UpperPrimary_Girls: null, UpperPrimary_Total: null, Secondary_Boys: 11.67, Secondary_Girls: 4.36, Secondary_Total: 8.1, HrSecondary_Boys: 4.59, HrSecondary_Girls: 2.34, HrSecondary_Total: 3.41 },
  { state: "Telangana", year: "2013-14", Primary_Boys: 6.04, Primary_Girls: 5.57, Primary_Total: 5.81, UpperPrimary_Boys: 4.63, UpperPrimary_Girls: 4.79, UpperPrimary_Total: 4.71, Secondary_Boys: 17.99, Secondary_Girls: 16.86, Secondary_Total: 17.43, HrSecondary_Boys: 13.67, HrSecondary_Girls: 13.2, HrSecondary_Total: 13.43 },
  { state: "Telangana", year: "2014-15", Primary_Boys: 2.21, Primary_Girls: 1.94, Primary_Total: 2.08, UpperPrimary_Boys: 2.43, UpperPrimary_Girls: 2.17, UpperPrimary_Total: 2.3, Secondary_Boys: 16.54, Secondary_Girls: 14.5, Secondary_Total: 15.53, HrSecondary_Boys: 2.06, HrSecondary_Girls: null, HrSecondary_Total: 0.77 },
  { state: "Tripura", year: "2012-13", Primary_Boys: 2.31, Primary_Girls: 2.11, Primary_Total: 2.22, UpperPrimary_Boys: 3.1, UpperPrimary_Girls: 3.07, UpperPrimary_Total: 3.08, Secondary_Boys: 24.09, Secondary_Girls: 26.99, Secondary_Total: 25.5, HrSecondary_Boys: 8.4, HrSecondary_Girls: 9.49, HrSecondary_Total: 8.87 },
  { state: "Tripura", year: "2013-14", Primary_Boys: 3.63, Primary_Girls: 3.52, Primary_Total: 3.58, UpperPrimary_Boys: 3.21, UpperPrimary_Girls: 2.2, UpperPrimary_Total: 2.72, Secondary_Boys: 24.51, Secondary_Girls: 25.7, Secondary_Total: 25.09, HrSecondary_Boys: 9.15, HrSecondary_Girls: 9.06, HrSecondary_Total: 9.11 },
  { state: "Tripura", year: "2014-15", Primary_Boys: 1.37, Primary_Girls: 1.19, Primary_Total: 1.28, UpperPrimary_Boys: 2.37, UpperPrimary_Girls: 1.61, UpperPrimary_Total: 1.99, Secondary_Boys: 28.03, Secondary_Girls: 28.83, Secondary_Total: 28.42, HrSecondary_Boys: 8.97, HrSecondary_Girls: 8.89, HrSecondary_Total: 8.93 },
  { state: "Uttar Pradesh", year: "2012-13", Primary_Boys: 10.53, Primary_Girls: 10.03, Primary_Total: 10.28, UpperPrimary_Boys: null, UpperPrimary_Girls: 3.1, UpperPrimary_Total: 1.06, Secondary_Boys: null, Secondary_Girls: null, Secondary_Total: null, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Uttar Pradesh", year: "2013-14", Primary_Boys: 7.91, Primary_Girls: 6.21, Primary_Total: 7.08, UpperPrimary_Boys: null, UpperPrimary_Girls: 2.43, UpperPrimary_Total: 0.53, Secondary_Boys: 7.26, Secondary_Girls: 7.35, Secondary_Total: 7.3, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Uttar Pradesh", year: "2014-15", Primary_Boys: 9.08, Primary_Girls: 8.04, Primary_Total: 8.58, UpperPrimary_Boys: 0.78, UpperPrimary_Girls: 4.61, UpperPrimary_Total: 2.7, Secondary_Boys: 9.89, Secondary_Girls: 10.6, Secondary_Total: 10.22, HrSecondary_Boys: 1.79, HrSecondary_Girls: 2.45, HrSecondary_Total: 2.1 },
  { state: "Uttarakhand", year: "2012-13", Primary_Boys: 1.14, Primary_Girls: 1.18, Primary_Total: 1.16, UpperPrimary_Boys: null, UpperPrimary_Girls: 1, UpperPrimary_Total: 0.13, Secondary_Boys: 8.97, Secondary_Girls: 10.45, Secondary_Total: 9.68, HrSecondary_Boys: 1.35, HrSecondary_Girls: 1.85, HrSecondary_Total: 1.59 },
  { state: "Uttarakhand", year: "2013-14", Primary_Boys: 3.28, Primary_Girls: 2.83, Primary_Total: 3.07, UpperPrimary_Boys: 1.78, UpperPrimary_Girls: 1.57, UpperPrimary_Total: 1.68, Secondary_Boys: 9.85, Secondary_Girls: 7.44, Secondary_Total: 8.7, HrSecondary_Boys: 0.23, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "Uttarakhand", year: "2014-15", Primary_Boys: 4.37, Primary_Girls: 3.67, Primary_Total: 4.04, UpperPrimary_Boys: 0.79, UpperPrimary_Girls: 1.62, UpperPrimary_Total: 1.19, Secondary_Boys: 11.26, Secondary_Girls: 9.46, Secondary_Total: 10.4, HrSecondary_Boys: 3.4, HrSecondary_Girls: 2.61, HrSecondary_Total: 3.01 },
  { state: "West Bengal", year: "2012-13", Primary_Boys: 6.88, Primary_Girls: 5.71, Primary_Total: 6.3, UpperPrimary_Boys: 6.29, UpperPrimary_Girls: 4.16, UpperPrimary_Total: 5.18, Secondary_Boys: 14.95, Secondary_Girls: 19.41, Secondary_Total: 17.3, HrSecondary_Boys: 7.81, HrSecondary_Girls: 8.49, HrSecondary_Total: 8.13 },
  { state: "West Bengal", year: "2013-14", Primary_Boys: 3.44, Primary_Girls: 2.37, Primary_Total: 2.91, UpperPrimary_Boys: 5.63, UpperPrimary_Girls: 3.1, UpperPrimary_Total: 4.31, Secondary_Boys: 16.73, Secondary_Girls: 19.77, Secondary_Total: 18.34, HrSecondary_Boys: 8.03, HrSecondary_Girls: 7.76, HrSecondary_Total: 7.9 },
  { state: "West Bengal", year: "2014-15", Primary_Boys: 2.13, Primary_Girls: 0.79, Primary_Total: 1.47, UpperPrimary_Boys: 5.84, UpperPrimary_Girls: 2.88, UpperPrimary_Total: 4.3, Secondary_Boys: 16.33, Secondary_Girls: 19.06, Secondary_Total: 17.8, HrSecondary_Boys: 8.18, HrSecondary_Girls: 8.04, HrSecondary_Total: 8.11 },
  { state: "All India", year: "2012-13", Primary_Boys: 4.68, Primary_Girls: 4.66, Primary_Total: 4.67, UpperPrimary_Boys: 2.3, UpperPrimary_Girls: 4.01, UpperPrimary_Total: 3.13, Secondary_Boys: 14.54, Secondary_Girls: 14.54, Secondary_Total: 14.54, HrSecondary_Boys: null, HrSecondary_Girls: null, HrSecondary_Total: null },
  { state: "All India", year: "2013-14", Primary_Boys: 4.53, Primary_Girls: 4.14, Primary_Total: 4.34, UpperPrimary_Boys: 3.09, UpperPrimary_Girls: 4.49, UpperPrimary_Total: 3.77, Secondary_Boys: 17.93, Secondary_Girls: 17.79, Secondary_Total: 17.86, HrSecondary_Boys: 1.48, HrSecondary_Girls: 1.61, HrSecondary_Total: 1.54 },
  { state: "All India", year: "2014-15", Primary_Boys: 4.36, Primary_Girls: 3.88, Primary_Total: 4.13, UpperPrimary_Boys: 3.49, UpperPrimary_Girls: 4.6, UpperPrimary_Total: 4.03, Secondary_Boys: 17.21, Secondary_Girls: 16.88, Secondary_Total: 17.06, HrSecondary_Boys: 0.25, HrSecondary_Girls: null, HrSecondary_Total: null },
];

// Get unique states (excluding All India)
export const getStates = () => {
  const states = [...new Set(dorRawData.filter(d => d.state !== "All India").map(d => d.state))];
  return states.sort();
};

// Get unique years
export const getYears = () => {
  return [...new Set(dorRawData.map(d => d.year))].sort();
};

// Education level definitions
export const educationLevels = [
  { key: 'Primary', label: 'Primary', color: '#3b82f6' },
  { key: 'UpperPrimary', label: 'Upper Primary', color: '#6366f1' },
  { key: 'Secondary', label: 'Secondary', color: '#8b5cf6' },
  { key: 'HrSecondary', label: 'Higher Secondary', color: '#ec4899' },
];

// Get data by state
export const getDataByState = (stateName) => {
  return dorRawData.filter(d => d.state === stateName);
};

// Get data by year
export const getDataByYear = (year) => {
  return dorRawData.filter(d => d.year === year && d.state !== "All India");
};

// Get national average
export const getNationalAverage = (year) => {
  return dorRawData.find(d => d.state === "All India" && d.year === year);
};

// Get top N states by dropout rate for a specific level and year
export const getTopStates = (year, level, n = 10, gender = 'Total') => {
  const data = getDataByYear(year);
  const key = `${level}_${gender}`;
  
  return data
    .filter(d => d[key] !== null && !isNaN(d[key]))
    .sort((a, b) => (b[key] || 0) - (a[key] || 0))
    .slice(0, n)
    .map(d => ({
      state: d.state,
      value: d[key],
      year: d.year
    }));
};

// Get bottom N states (best performing)
export const getBottomStates = (year, level, n = 10, gender = 'Total') => {
  const data = getDataByYear(year);
  const key = `${level}_${gender}`;
  
  return data
    .filter(d => d[key] !== null && !isNaN(d[key]) && d[key] > 0)
    .sort((a, b) => (a[key] || 0) - (b[key] || 0))
    .slice(0, n)
    .map(d => ({
      state: d.state,
      value: d[key],
      year: d.year
    }));
};

// Get gender comparison data for a year and level
export const getGenderComparison = (year, level) => {
  const data = getDataByYear(year);
  
  return data
    .filter(d => d[`${level}_Boys`] !== null && d[`${level}_Girls`] !== null)
    .map(d => ({
      state: d.state,
      boys: d[`${level}_Boys`],
      girls: d[`${level}_Girls`],
      total: d[`${level}_Total`],
      genderGap: (d[`${level}_Girls`] || 0) - (d[`${level}_Boys`] || 0)
    }))
    .sort((a, b) => Math.abs(b.genderGap) - Math.abs(a.genderGap));
};

// Get trend data for a state across all years
export const getStateTrend = (stateName, level, gender = 'Total') => {
  const data = getDataByState(stateName);
  const key = `${level}_${gender}`;
  
  return data.map(d => ({
    year: d.year,
    value: d[key]
  }));
};

// Get overall stats for a year
export const getYearStats = (year) => {
  const data = getDataByYear(year);
  const national = getNationalAverage(year);
  
  return {
    totalStates: data.length,
    national,
    avgPrimary: national?.Primary_Total,
    avgSecondary: national?.Secondary_Total,
    avgUpperPrimary: national?.UpperPrimary_Total,
    avgHrSecondary: national?.HrSecondary_Total,
  };
};

// Get level-wise comparison for all years
export const getLevelWiseComparison = () => {
  return getYears().map(year => {
    const national = getNationalAverage(year);
    return {
      year,
      Primary: national?.Primary_Total,
      UpperPrimary: national?.UpperPrimary_Total,
      Secondary: national?.Secondary_Total,
      HrSecondary: national?.HrSecondary_Total,
    };
  });
};
