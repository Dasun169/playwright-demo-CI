export const checkoutErrorData = {
    emptyFirstName: {
        firstName: "",
        lastName: "Doe",
        postalCode: "12345",
        errorMessage: "Error: First Name is required"
    },
    emptyLastName: {
        firstName: "John",
        lastName: "",
        postalCode: "12345",
        errorMessage: "Error: Last Name is required"
    },
    emptyPostalCode: {
        firstName: "John",
        lastName: "Doe",
        postalCode: "",
        errorMessage: "Error: Postal Code is required"
    },
    validCheckout: {
        firstName: "John",
        lastName: "Doe",
        postalCode: "12345",
        errorMessage: ""
    }
};