import { registerUsersSchema } from "./register-users-schema";

describe("registerUsersSchema", () => {
  it("should validate correct data", () => {
    const result = registerUsersSchema.safeParse({
      name: "João",
      email: "joao@test.com",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("joao@test.com");
    }
  });

  it("should normalize email to lowercase", () => {
    const result = registerUsersSchema.safeParse({
      name: "João",
      email: "JoAo@TeSt.COM",
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("joao@test.com");
    }
  });

  it("should reject empty name", () => {
    const result = registerUsersSchema.safeParse({
      name: "",
      email: "joao@test.com",
    });
    expect(result.success).toBe(false);
  });

  it("should reject invalid email", () => {
    const result = registerUsersSchema.safeParse({
      name: "João",
      email: "email-invalido",
    });
    expect(result.success).toBe(false);
  });

  it("should reject when name is missing", () => {
    const result = registerUsersSchema.safeParse({
      email: "joao@test.com",
    });
    expect(result.success).toBe(false);
  });
});
