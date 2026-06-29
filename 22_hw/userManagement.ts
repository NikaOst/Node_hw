// Вложенные пространства имен для управления пользователями
// Создайте файл `userManagement.ts`, в котором определите пространство имен `UserManagement`.
// Внутри него создайте вложенное пространство имен `Admin`. Внутри `Admin` создайте класс `AdminUser`,
//  который будет иметь свойства для имени, email и прав доступа (например, `isSuperAdmin`).
// Также создайте методы для изменения прав доступа.
export namespace UserManagement {
  export namespace Admin {
    export class AdminUser {
      constructor(
        public name: string,
        public email: string,
        public isSuperAdmin: boolean,
      ) {}
      public makeSAdmin(): void {
        this.isSuperAdmin = true;
      }
      public makeUser(): void {
        this.isSuperAdmin = false;
      }
    }
  }
}
