"use client";

import React, { useRef } from "react";

const Page = () => {
  const refAspx = useRef<HTMLPreElement>(null);
  const refCs = useRef<HTMLPreElement>(null);

  const handleCopy = (ref: React.RefObject<HTMLPreElement>, label: string) => {
    if (ref.current) {
      navigator.clipboard.writeText(ref.current.innerText);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 space-y-10 flex">
      <h1 className="text-2xl font-bold mb-4">
        📄 Câu 3: Hiển thị danh mục và đăng nhập
      </h1>

      {/* --- ASPX --- */}
      <div className="relative border rounded-lg bg-gray-900 text-white p-4">
        <button
          onClick={() => handleCopy(refAspx, "giao diện ASPX")}
          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
        >
          Sao chép ASPX
        </button>
        <h2 className="text-lg font-semibold mb-2">🔹 Giao diện (cau3.aspx)</h2>
        <pre
          ref={refAspx}
          className="whitespace-pre-wrap text-sm overflow-x-auto"
        >
          {`<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style>
        .container{
            display:flex;
            justify-content:space-between;
            border:1px solid;
            grid-gap:9px;
        }
        .content{border-right:1px solid;}
        .left{width:18%; border-right:1px solid;}
        .right{width:20%; border-right:1px solid;}
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <div class="left">
                <h2>Hãng sản xuất</h2>
                <asp:DataList ID="DataList1" runat="server">
                    <ItemTemplate>
                        <div style="margin-bottom:10px; color:blue;">
                            <%# Eval("TenDM") %>
                        </div>
                    </ItemTemplate>
                </asp:DataList>
            </div>
            <div class="content"></div>
            <div class="right">
                <asp:Login ID="Login1" runat="server"></asp:Login>
            </div>
        </div>
    </form>
</body>
</html>`}
        </pre>
      </div>

      {/* --- Code-behind --- */}
      <div className="relative border rounded-lg bg-gray-900 text-white p-4">
        <button
          onClick={() => handleCopy(refCs, "code-behind C#")}
          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
        >
          Sao chép C#
        </button>
        <h2 className="text-lg font-semibold mb-2">
          🔹 Code-behind (cau3.aspx.cs)
        </h2>
        <pre
          ref={refCs}
          className="whitespace-pre-wrap text-sm overflow-x-auto"
        >
          {`cau2 kn = new cau2();

protected void Page_Load(object sender, EventArgs e)
{
    if (Page.IsPostBack) return;

    string q = "SELECT TenDM FROM DANHMUC";
    try
    {
        this.DataList1.DataSource = kn.GetData(q);
        this.DataList1.DataBind();
    }
    catch(SqlException ex)
    {
        Response.Write(ex);
    }
}`}
        </pre>
      </div>
    </div>
  );
};

export default Page;
