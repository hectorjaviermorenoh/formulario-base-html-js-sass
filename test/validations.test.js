

import {describe, expect, test} from '@jest/globals';
import { sanitizeHTML, normalizeText } from '../js/validations.js';



describe("sanitizeHTML", () => {
  test("escapa etiquetas HTML", () => {
    const input = "<script>alert('xss')</script>";
    const expected = "&lt;script&gt;alert(&#039;xss&#039;)&lt;/script&gt;";
    expect(sanitizeHTML(input)).toBe(expected);
  });
});

describe("normalizeText", () => {
  test("normaliza mayúsculas y espacios", () => {
    const input = "   jUan  ";
    const expected = "Juan.";
    expect(normalizeText(input)).toBe(expected);
  });
});


