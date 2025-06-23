import { MockObjectItem } from "./test-types";

export const apple: MockObjectItem = { type: "apple", name: "Apple", price: 1, daysUntilExpiryDate: "three" };
export const orange: MockObjectItem = { type: "orange", name: "Orange", price: 2, daysUntilExpiryDate: "five" };
export const banana: MockObjectItem = { type: "banana", name: "Banana", price: 10, daysUntilExpiryDate: "five" };

export const objectItems: MockObjectItem[] = [apple, orange, banana];
