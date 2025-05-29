using Microsoft.Data.SqlClient;

namespace WritersBlock.Server.Databases
{
    public interface ISql
    {
        SqlConnection WBD { get; }
    }
}