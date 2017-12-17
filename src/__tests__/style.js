import style, { defineStyle } from "./../style";

const defaultValues = { ...style };

afterEach(() => defineStyle(defaultValues));

describe("style", () => {
  it("Should be able to mutate style", () => {
    expect(style.width).toBe("320px");
    defineStyle({
      width: "100px"
    });
    expect(style.width).toBe("100px");
  });

  it("Should mutate only available keys", () => {
    defineStyle({
      zIndex: 999,
      overflow: "hidden"
    });
    expect(style.zIndex).toBe(999);
    expect(style.overflow).toBe(undefined);
  });
});
