import test from "node:test";
import assert from "node:assert/strict";
import { DICT, LANGUAGES, fill } from "./i18n";

test("includes Arabic in LANGUAGES list", () => {
  const ar = LANGUAGES.find((l) => l.code === "ar");
  assert.ok(ar, "Arabic language should be present in LANGUAGES");
  assert.equal(ar?.label, "العربية");
});

test("Arabic dictionary has all required keys matching English dictionary", () => {
  const enKeys = Object.keys(DICT.en);
  const arKeys = Object.keys(DICT.ar);

  for (const key of enKeys) {
    assert.ok(
      key in DICT.ar,
      `Key "${key}" should exist in Arabic dictionary`
    );
    const val = (DICT.ar as Record<string, unknown>)[key];
    assert.ok(
      val !== undefined && val !== "",
      `Key "${key}" should have a non-empty value in Arabic dictionary`
    );
  }

  assert.equal(arKeys.length, enKeys.length);
});

test("fill correctly interpolates variables into Arabic string templates", () => {
  const res = fill(DICT.ar.fullFrameEq, 50);
  assert.equal(res, "≈ 50 مم مكافئ إطار كامل");
});
