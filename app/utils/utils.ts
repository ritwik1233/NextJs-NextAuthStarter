import { randomUUID } from "crypto";

export function isEntryEmpty(value: string) {
  return value.length === 0;
}

export function validateEmail(email: string) {
  var mailformat =
    /(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/;
  return !!mailformat.test(email);
}

