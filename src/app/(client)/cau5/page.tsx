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
        📄 Câu 5: Hiển thị sản phẩm theo danh mục - Đếm lượt truy cập
      </h1>

      {/* --- ASPX --- */}
      <div className="relative border rounded-lg bg-gray-900 text-white p-4">
        <button
          onClick={() => handleCopy(refAspx, "giao diện ASPX")}
          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
        >
          Sao chép ASPX
        </button>
        <h2 className="text-lg font-semibold mb-2">🔹 Giao diện (cau5.aspx)</h2>
        <pre
          ref={refAspx}
          className="whitespace-pre-wrap text-sm overflow-x-auto"
        >
          {`<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Hiển thị sản phẩm theo danh mục - Đếm lượt truy cập</title>
    <style>
        .container {
            display: flex;
            justify-content: space-between;
            border: 1px solid;
            gap: 9px;
        }

        .content {
            border-right: 1px solid;
            width: 60%;
        }

        .left {
            width: 18%;
            border-right: 1px solid;
        }

        .right {
            width: 20%;
            border-right: 1px solid;
            padding: 10px;
            font-weight: bold;
            font-size: 16px;
            color: darkred;
        }

        .danhmuc-item {
            margin-bottom: 10px;
            color: blue;
        }

        .danhmuc-item:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server">
        <div class="container">
            <div class="left">
                <h2>Hãng sản xuất</h2>
                <asp:DataList ID="DataList1" runat="server" OnItemCommand="DataList1_ItemCommand">
                    <ItemTemplate>
                        <asp:LinkButton 
                            ID="btnChon" 
                            runat="server" 
                            Text='<%# Eval("TenDM") %>' 
                            CommandName="chonDM" 
                            CommandArgument='<%# Eval("MaDM") %>' 
                            CssClass="danhmuc-item" />
                    </ItemTemplate>
                </asp:DataList>
            </div>

            <div class="content">
                <asp:GridView ID="GridView1" runat="server" AutoGenerateColumns="False" BorderWidth="1" CellPadding="5">
                    <Columns>
                        <asp:TemplateField HeaderText="Hình ảnh">
                            <ItemTemplate>
                                <asp:Image ID="Image1" runat="server"
                                    ImageUrl='<%# Eval("HinhAnh") %>'
                                    Width="100px" Height="100px" />
                            </ItemTemplate>
                        </asp:TemplateField>
                        <asp:BoundField DataField="DonGia" HeaderText="Giá" DataFormatString="{0:N0} VND" />
                    </Columns>
                </asp:GridView>
            </div>

            <div class="right">
                <asp:Label ID="lblSoLuotTruyCap" runat="server" Text="Số lượt truy cập: 0"></asp:Label>
            </div>
        </div>
    </form>
</body>
</html>`}
        </pre>
      </div>

      {/* --- Code-behind C# --- */}
      <div className="relative border rounded-lg bg-gray-900 text-white p-4">
        <button
          onClick={() => handleCopy(refCs, "code-behind C#")}
          className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-1 rounded"
        >
          Sao chép C#
        </button>
        <h2 className="text-lg font-semibold mb-2">
          🔹 Code-behind (cau5.aspx.cs)
        </h2>
        <pre
          ref={refCs}
          className="whitespace-pre-wrap text-sm overflow-x-auto"
        >
          {`cau2 kn = new cau2();

protected void Page_Load(object sender, EventArgs e)
{
    if (!IsPostBack)
    {
        // Đếm số lượt truy cập bằng biến Application
        int count = 0;
        if (Application["SoLuotTruyCap"] != null)
        {
            count = (int)Application["SoLuotTruyCap"];
        }
        count++;
        Application["SoLuotTruyCap"] = count;

        lblSoLuotTruyCap.Text = "Số lượt truy cập: " + count.ToString();

        LoadDanhMuc();
        LoadTatCaSanPham();
    }
}

private void LoadDanhMuc()
{
    string query = "SELECT MADM, TenDM FROM DANHMUC";
    try
    {
        DataTable dt = kn.GetData(query);
        DataList1.DataSource = dt;
        DataList1.DataBind();
    }
    catch (SqlException ex)
    {
        Response.Write("Lỗi load danh mục: " + ex.Message);
    }
}

private void LoadTatCaSanPham()
{
    string query = "SELECT HinhAnh, DonGia FROM MATHANG";
    try
    {
        DataTable dt = kn.GetData(query);
        GridView1.DataSource = dt;
        GridView1.DataBind();
    }
    catch (SqlException ex)
    {
        Response.Write("Lỗi load sản phẩm: " + ex.Message);
    }
}

protected void DataList1_ItemCommand(object source, DataListCommandEventArgs e)
{
    if (e.CommandName == "chonDM")
    {
        string maDanhMuc = e.CommandArgument.ToString();
        string query = "SELECT HinhAnh, DonGia FROM MATHANG WHERE MaDM = @MaDM";

        try
        {
            using (SqlConnection conn = new SqlConnection(kn.GetConnectionString()))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand(query, conn);
                cmd.Parameters.AddWithValue("@MaDM", maDanhMuc);

                SqlDataAdapter da = new SqlDataAdapter(cmd);
                DataTable dt = new DataTable();
                da.Fill(dt);

                GridView1.DataSource = dt;
                GridView1.DataBind();
            }
        }
        catch (SqlException ex)
        {
            Response.Write("Lỗi lọc sản phẩm theo danh mục: " + ex.Message);
        }
    }
}`}
        </pre>
      </div>
    </div>
  );
};

export default Page;
