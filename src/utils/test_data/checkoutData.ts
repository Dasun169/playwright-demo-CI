export const checkoutErrorData = {
    emptyFirstName: {
        testId: "TC_CHK_021",
        description: "Validate empty first name error",
        firstName: "",
        lastName: "Doe",
        postalCode: "12345",
        errorMessage: "Error: First Name is required"
    },
    emptyLastName: {
        testId: "TC_CHK_022",
        description: "Validate empty last name error",
        firstName: "John",
        lastName: "",
        postalCode: "12345",
        errorMessage: "Error: Last Name is required"
    },
    emptyPostalCode: {
        testId: "TC_CHK_023",
        description: "Validate empty postal code error",
        firstName: "John",
        lastName: "Doe",
        postalCode: "",
        errorMessage: "Error: Postal Code is required"
    }
};