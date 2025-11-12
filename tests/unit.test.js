const cheerio = require('cheerio');
const { sampleHtmlWithYale } = require('./test-utils');

describe('Content remains unmodified', () => {
  
  test('should keep Yale content unchanged', () => {
    const $ = cheerio.load(sampleHtmlWithYale);
    const originalHtml = $.html();
    
    // Ensure title and text content remain unchanged
    expect(originalHtml).toContain('Yale University Test Page');
    expect(originalHtml).toContain('Welcome to Yale University');
    expect(originalHtml).toContain('Yale University is a private Ivy League');
    expect(originalHtml).toContain('Yale was founded in 1701');
    
    // URLs and attributes should remain unchanged
    expect(originalHtml).toContain('https://www.yale.edu/about');
    expect(originalHtml).toContain('https://www.yale.edu/admissions');
    expect(originalHtml).toContain('https://www.yale.edu/images/logo.png');
    expect(originalHtml).toContain('mailto:info@yale.edu');
    expect(originalHtml).toMatch(/href="https:\/\/www\.yale\.edu\/about"/);
    expect(originalHtml).toMatch(/href="https:\/\/www\.yale\.edu\/admissions"/);
    expect(originalHtml).toContain('>About Yale<');
    expect(originalHtml).toContain('>Yale Admissions<');
    expect(originalHtml).toContain('alt="Yale Logo"');
  });

  test('should handle text that has no Yale references', () => {
    const htmlWithoutYale = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Test Page</title>
      </head>
      <body>
        <h1>Hello World</h1>
        <p>This is a test page with no references to that university.</p>
      </body>
      </html>
    `;
    
    const $ = cheerio.load(htmlWithoutYale);
    
    const originalHtml = $.html();
    // Content should remain the same
    expect(originalHtml).toContain('<title>Test Page</title>');
    expect(originalHtml).toContain('<h1>Hello World</h1>');
    expect(originalHtml).toContain('<p>This is a test page with no references to that university.</p>');
  });

  test('should handle case-insensitive replacements', () => {
    const mixedCaseHtml = `
      <p>YALE University, Yale College, and yale medical school are all part of the same institution.</p>
    `;
    
    const $ = cheerio.load(mixedCaseHtml);
    const originalHtml = $.html();
    expect(originalHtml).toContain('YALE University, Yale College, and yale medical school');
  });
});
