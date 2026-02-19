import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
  getAllProductsApi,
  createProductApi,
  uploadImageToCloudinary,
  updateProductApi,
  deleteProductApi,
} from "../services/productApi";
import "../styles/ProductManage.css";

export default function ProductManage() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [keyword, setKeyword] = useState("");
  const pageSize = 4;
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [formData, setFormData] = useState({
    productID: "",
    productName: "",
    imageUrl: "",
    price: "",
    quantity: "",
    description: "",
    status: "ACTIVE",
  });

  useEffect(() => {
    fetchProducts(currentPage, keyword);
  }, [currentPage, keyword]);

  const fetchProducts = async (page, searchKeyword) => {
    try {
      const data = await getAllProductsApi(page, pageSize, searchKeyword);

      setProducts(data.content);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setUploading(true);

      let imageUrl = formData.imageUrl;

      if (selectedFile) {
        imageUrl = await uploadImageToCloudinary(selectedFile);
      }

      const payload = {
        ...formData,
        imageUrl,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };

      if (editingProduct) {
        await updateProductApi(editingProduct.id, payload);
      } else {
        await createProductApi(payload);
      }

      Swal.fire({
        icon: "success",
        title: editingProduct ? "Cập nhật thành công!" : "Thêm thành công!",
        timer: 1500,
        showConfirmButton: false,
      });

      resetForm();
      fetchProducts(currentPage, keyword);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: error.message,
      });
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleEdit = (product) => {
    setEditingProduct(product);

    setFormData({
      productID: product.productID,
      productName: product.productName,
      imageUrl: product.imageUrl,
      price: product.price,
      quantity: product.quantity,
      description: product.description || "",
      status: product.status,
    });

    setPreview(product.imageUrl);
    setIsOpenModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#7f8c8d",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProductApi(id);

      Swal.fire({
        icon: "success",
        title: "Đã xóa!",
        text: "Đã được xóa thành công.",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchProducts(currentPage, keyword);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: error.message,
      });
    }
  };

  const resetForm = () => {
    setIsOpenModal(false);
    setEditingProduct(null);
    setSelectedFile(null);
    setPreview(null);

    setFormData({
      productID: "",
      productName: "",
      imageUrl: "",
      price: "",
      quantity: "",
      description: "",
      status: "ACTIVE",
    });
  };

  const renderStatus = (status) => {
    switch (status) {
      case "ACTIVE":
        return <span className="status-badge active">Đang bán</span>;
      case "OUT_OF_STOCK":
        return <span className="status-badge warning">Hết hàng</span>;
      case "INACTIVE":
        return <span className="status-badge inactive">Ngừng kinh doanh</span>;
      default:
        return null;
    }
  };

  return (
    <div className="product-container">
      <div className="page-header">
        <h1>Quản lý sản phẩm</h1>
        <button className="btn-add" onClick={() => setIsOpenModal(true)}>
          Thêm mới
        </button>
      </div>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm theo mã, tên..."
          value={keyword}
          onChange={(e) => {
            setCurrentPage(0);
            setKeyword(e.target.value);
          }}
        />
      </div>

      <div className="table-responsive">
        <table className="admin-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sản phẩm</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={product.id}>
                <td>{currentPage * pageSize + index + 1}</td>
                <td>{product.productID}</td>
                <td>
                  <img
                    src={product.imageUrl}
                    alt={product.productName}
                    // onError={(e) => (e.target.src = "/test.jpg")}
                  />
                </td>
                <td>{product.productName}</td>
                <td style={{ color: "#e74c3c", fontWeight: "bold" }}>
                  {product.price?.toLocaleString("vi-VN")}đ
                </td>
                <td>{product.quantity}</td>
                <td>{renderStatus(product.status)}</td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn-action unlock"
                      onClick={() => handleEdit(product)}
                    >
                      Sửa
                    </button>

                    <button
                      className="btn-action delete"
                      onClick={() => handleDelete(product.id)}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button
            className="page-nav"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            disabled={currentPage === 0}
          >
            ‹ Trước
          </button>

          <div className="page-info">
            Trang <strong>{currentPage + 1}</strong> / {totalPages}
          </div>

          <button
            className="page-nav"
            onClick={() =>
              setCurrentPage((prev) =>
                prev < totalPages - 1 ? prev + 1 : prev,
              )
            }
            disabled={currentPage >= totalPages - 1}
          >
            Sau ›
          </button>
        </div>
      </div>

      {isOpenModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{editingProduct ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}</h2>

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Mã sản phẩm"
                value={formData.productID}
                onChange={(e) =>
                  setFormData({ ...formData, productID: e.target.value })
                }
                required
                disabled={!!editingProduct}
              />

              <input
                type="text"
                placeholder="Tên sản phẩm"
                value={formData.productName}
                onChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                required
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required={!editingProduct}
              />

              {preview && (
                <div className="image-preview-container">
                  <img src={preview} alt="Preview" className="preview-img" />
                  {uploading && (
                    <span className="uploading-text">Đang tải ảnh lên...</span>
                  )}
                </div>
              )}

              <input
                type="number"
                placeholder="Giá"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
              />

              <input
                type="number"
                placeholder="Số lượng"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                required
              />

              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="ACTIVE">Đang bán</option>
                <option value="OUT_OF_STOCK">Hết hàng</option>
                <option value="INACTIVE">Ngừng kinh doanh</option>
              </select>

              <div className="modal-actions">
                <button type="button" onClick={resetForm}>
                  Hủy
                </button>
                <button type="submit" disabled={uploading}>
                  {uploading
                    ? "Đang xử lý..."
                    : editingProduct
                      ? "Cập nhật"
                      : "Lưu"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
