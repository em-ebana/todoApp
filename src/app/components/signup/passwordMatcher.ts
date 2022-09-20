import { AbstractControl, ValidationErrors } from "@angular/forms"

export const passwordMatch = (control: AbstractControl): ValidationErrors | null =>{
    const password1 = control.get('password1')?.value
    const password2 = control.get('password2')?.value
    if(!password1 ||  password2) return null;
    return password1 === password2 ? null : { noMatch: true}
}