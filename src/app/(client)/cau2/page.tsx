"use client";

import React, { useRef } from "react";

const Page = () => {
  const codeRef = useRef<HTMLPreElement>(null);

  const handleCopy = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-4">
        📄 Đoạn code C# kết nối SQL Server
      </h1>

      <div className="relative border rounded-lg bg-gray-900 text-white p-4">
        <button
          onClick={handleCopy}
          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
        >
          Sao chép
        </button>

        <pre
          ref={codeRef}
          className="whitespace-pre-wrap text-sm overflow-x-auto"
        >
          {`//using System.Data;
//using System.Data.SqlClient;
private string path = @"Data Source=(LocalDB)\\MSSQLLocalDB;AttachDbFilename=D:\\C##\\truongNhatCuongOnTap\\truongnhatcuong\\truongnhatcuong\\App_Data\\aothethao.mdf;Integrated Security=True";

SqlConnection con;

public SqlConnection GetConnection()
{
    return new SqlConnection(path);
}
public string GetConnectionString()
{
    return path;
}

private void connect()
{
    con = new SqlConnection(path);
    con.Open();
}
private void disconnect()
{
    if (con.State == ConnectionState.Open)
        con.Close();
}
public DataTable GetData(string q)
{
    DataTable dt = new DataTable();
    try {
        connect();
        SqlDataAdapter da = new SqlDataAdapter(q, con);
        da.Fill(dt);
    }
    finally
    {
        disconnect();
    }
    return dt;
}
public DataTable GetData(SqlCommand cmd)
{
    DataTable dt = new DataTable();
    using (SqlConnection con = GetConnection())
    {
        cmd.Connection = con;
        con.Open();
        using (SqlDataAdapter da = new SqlDataAdapter(cmd))
        {
            da.Fill(dt);
        }
    }
    return dt;
}

//<appSettings>
//<add key = "ValidationSettings:UnobtrusiveValidationMode" value="None" />
//</appSettings>`}
        </pre>
      </div>
    </div>
  );
};

export default Page;
