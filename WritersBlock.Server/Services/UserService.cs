using WritersBlock.Server.Models;
using WritersBlock.Server.Databases;
using Dapper;

namespace WritersBlock.Server.Services
{
    public class UserService(ISql sql) : IUserService
    {
        private readonly ISql _sql = sql;

        public async Task<int> RegisterUser(User request)
        {
            using Microsoft.Data.SqlClient.SqlConnection c = _sql.WBD;
            if (await c.ExecuteAsync("SELECT * FROM Users WHERE Email = @Email", request) == 1) return 0;

            return await c.QuerySingleOrDefaultAsync<int>(
                "INSERT into Users (Username, Email, Password)" +
                "VALUES(@Username, @Email, @Password); SELECT SCOPE_IDENTITY()", request);
        }

        public async Task<User?> LoginUser(User request)
        {
            using Microsoft.Data.SqlClient.SqlConnection c = _sql.WBD;
            User? userID = await c.QuerySingleOrDefaultAsync<User>(
                "SELECT ID, Username FROM Users WHERE Username = @Username AND Password = @Password", request);

            return userID ?? null;
        }

        public async Task<User?> GetUserById(int id)
        {
            using Microsoft.Data.SqlClient.SqlConnection c = _sql.WBD;
            return await c.QuerySingleOrDefaultAsync<User>(
                "SELECT ID, Email, Username, Password FROM Users WHERE ID = @ID", new { ID = id });
        }


        //public async Task<bool> UpdateUser(int id, User updatedUser)
        //{
        //    using Microsoft.Data.SqlClient.SqlConnection c = _sql.WBD;

        //    var affectedRows = await c.ExecuteAsync(
        //        "UPDATE Users SET Email = @Email, Username = @Username, Password = @Password WHERE ID = @ID",
        //        new
        //        {
        //            ID = id,
        //            Email = updatedUser.Email,
        //            Username = updatedUser.Username,
        //            Password = updatedUser.Password
        //        });

        //    return affectedRows > 0;
        //}
    }
}

/*
╔════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╗
║                                                    RegisterUser Method — Full Explanation                                                  ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ public async Task<int> RegisterUser(User request)                                                                                          ║
║ ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── ║
║ - public           → Access modifier: allows this method to be called from outside the class.                                              ║
║ - async            → Indicates the method runs asynchronously and can use 'await' to avoid blocking.                                       ║
║ - Task<int>        → Return type: represents an asynchronous operation that returns an integer (typically a user ID).                      ║
║ - RegisterUser     → Method name: suggests this function registers a user.                                                                 ║
║ - User request     → Parameter: an object containing user data like Username, Email, and Password.                                         ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ using Microsoft.Data.SqlClient.SqlConnection c = _sql.WBD;                                                                                 ║
║ ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── ║
║ - using                                  → Ensures that the SqlConnection is properly disposed after use (resource management).            ║
║ - Microsoft.Data.SqlClient.SqlConnection → Full class name for creating a SQL Server connection.                                           ║
║ - c                                      → Variable name for the opened SqlConnection.                                                     ║
║ - _sql.WBD                               → A property or field that provides a configured SqlConnection instance.                          ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ if (await c.ExecuteAsync("SELECT * FROM Users WHERE Email = @Email", request) == 1) return 0;                                              ║
║ ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── ║
║ - if                            → Conditional statement that checks if a user already exists.                                              ║
║ - await                         → Waits asynchronously for the ExecuteAsync method to complete.                                            ║
║ - c.ExecuteAsync(...)           → Executes a SQL query asynchronously (likely via Dapper); runs the SELECT statement.                      ║
║ - "SELECT * FROM Users ..."     → SQL query: looks for a user with the same email in the Users table.                                      ║
║ - @Email                        → A parameter in the SQL query; Dapper maps it to request.Email.                                           ║
║ - request                       → Supplies parameter values from the User object.                                                          ║
║ - == 1                          → Checks if exactly one row matches the email (i.e., the user already exists).                             ║
║ - return 0                      → If a user is found, return 0 to indicate failure to register.                                            ║
╠════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╣
║ return await c.QuerySingleOrDefaultAsync<int>(                                                                                             ║
║     "Insert into Users (Username, Email, Password)                                                                                         ║
║     VALUES (@Username, @Email, @Password); select SCOPE_IDENTITY()", request);                                                             ║
║ ────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────── ║
║ - return                       → Returns the result of the operation (the new user's ID).                                                  ║
║ - await                        → Asynchronously waits for the operation to finish.                                                         ║
║ - QuerySingleOrDefaultAsync<T> → Executes the query and expects a single result of type T; returns default if no result is found.          ║
║ - int                          → Specifies the result should be parsed as an integer (user ID).                                            ║
║ - INSERT into Users (...)      → SQL INSERT statement to add a new user to the Users table.                                                ║
║ - @Username, @Email, @Password → SQL parameters filled in by the 'request' object's properties.                                            ║
║ - select SCOPE_IDENTITY()      → SQL function that returns the ID of the most recently inserted row in the current scope.                  ║
║ - request                      → The object whose properties supply values for the SQL parameters.                                         ║
╚════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════════╝
*/
