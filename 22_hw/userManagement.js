// Вложенные пространства имен для управления пользователями
// Создайте файл `userManagement.ts`, в котором определите пространство имен `UserManagement`.
// Внутри него создайте вложенное пространство имен `Admin`. Внутри `Admin` создайте класс `AdminUser`,
//  который будет иметь свойства для имени, email и прав доступа (например, `isSuperAdmin`).
// Также создайте методы для изменения прав доступа.
export var UserManagement;
(function (UserManagement) {
    let Admin;
    (function (Admin) {
        class AdminUser {
            name;
            email;
            isSuperAdmin;
            constructor(name, email, isSuperAdmin) {
                this.name = name;
                this.email = email;
                this.isSuperAdmin = isSuperAdmin;
            }
            makeSAdmin() {
                this.isSuperAdmin = true;
            }
            makeUser() {
                this.isSuperAdmin = false;
            }
        }
        Admin.AdminUser = AdminUser;
    })(Admin = UserManagement.Admin || (UserManagement.Admin = {}));
})(UserManagement || (UserManagement = {}));
