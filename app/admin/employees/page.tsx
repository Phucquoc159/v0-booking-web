"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { createNhanVien, deleteNhanVien, updateNhanVien } from "@/lib/services/nhan-vien.service";
import { 
  fetchUserInfoById, 
  updateUserInfo
} from "@/lib/services/auth.service" 
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEmployees } from "@/lib/hooks/employee";
import { useState, useEffect } from "react"
// Import type cho nhân viên (cần thiết cho form sửa)
type Employee = {
    idNv?: string;
    ho?: string;
    ten?: string;
    email?: string;
    diaChi?: string;
    ngaySinh?: string | null; // Có thể là string cho ngày sinh
    sdt?: string;
    idBp?: string;
    password?: string; // Mật khẩu có thể không được hiển thị/sửa
    username?: string;
    phai?: string;
    idNq?: string;
}

// Cấu hình đã cho
const departmentConfig = {
  BP2: { label: "Quản Trị", color: "bg-purple-500/10 text-purple-500 border-purple-500/20", NQ: "NQ2", BP: "BP2" },
  BP1: { label: "Lễ Tân", color: "bg-blue-500/10 text-blue-500 border-blue-500/20", NQ: "NQ1", BP: "BP1" },
}

const statusConfig = {
  BP1: { label: "User", color: "bg-green-500/10 text-white border-green-500/20" },
  BP2: { label: "Admin", color: "bg-gray-500/10 text-blue border-gray-500/20" },
}

// Giá trị khởi tạo cho form Thêm
const initialFormData = {
  ho: '',
  ten: '',
  email: '',
  diaChi: '',
  sdt: '',
  idBp: 'BP1', // Mặc định Lễ Tân
  password: '',
  username: '',
  phai: 'Nam',
  idNq: 'NQ1', // Mặc định Nhóm quyền 1
}

export default function EmployeesPage() {
  const [addFormData, setAddFormData] = useState(initialFormData)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  const queryClient = useQueryClient();

  const { employees, isLoading, isError, error } = useEmployees();

  // --- Mutations ---

  const deleteMutation = useMutation({
    mutationFn: deleteNhanVien,
    onSuccess: () => {
      alert('Xóa nhân viên thành công!');
      queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error) => {
      alert(`Xóa thất bại: ${error.message}`);
    }
  });

  const createMutation = useMutation({
    mutationFn: createNhanVien,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['employees'] });
      // Reset form
      setAddFormData(initialFormData);
      alert('Thêm nhân viên thành công!');
    },
    onError: (error: any) => {
      alert(`Thêm thất bại: ${error.response?.data?.message || error.message}`);
    }
  });

  const updateMutation = useMutation({
    mutationFn: updateNhanVien,
    onSuccess: () => {
        alert('Cập nhật nhân viên thành công!');
        setIsEditDialogOpen(false); // Đóng dialog
        queryClient.invalidateQueries({ queryKey: ['employees'] });
    },
    onError: (error: any) => {
        alert(`Cập nhật thất bại: ${error.response?.data?.message || error.message}`);
    }
  });


  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (isError) return <p>Lỗi: {(error as Error).message}</p>;

  // --- Handlers ---

  const handleCreateEmployee = async () => {
    // Logic tạo idNv: Tự động thêm tiền tố 'NV'
    const idNv = "NV" + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Tạo bản sao dữ liệu và loại bỏ các trường không cần gửi (nếu có)
    const dataToSend = {
      ...addFormData,
      idNv,
    }
    
    // @ts-ignore
    createMutation.mutate(dataToSend);
  };
  
  const handleUpdateEmployee = async () => {
    if (!editingEmployee) return;

    // Chuẩn bị dữ liệu gửi đi (loại bỏ username, password nếu không muốn sửa)
    const dataToUpdate = {
        idNv: editingEmployee.idNv,
        ho: editingEmployee.ho,
        ten: editingEmployee.ten,
        email: editingEmployee.email,
        diaChi: editingEmployee.diaChi,
        sdt: editingEmployee.sdt,
        idBp: editingEmployee.idBp,
        phai: editingEmployee.phai,
        idNq: editingEmployee.idNq,
        // Không gửi password/username trừ khi có trường nhập riêng cho việc đổi
    };

    const response = await updateUserInfo(dataToUpdate as any)
      
    if (response.success) {
        alert(response.message || "Cập nhật thông tin cá nhân thành công!")
      } else {
        alert(response.message || "Cập nhật thất bại. Vui lòng thử lại.")
      }
  };

  const handleFullNameChange = (value: string, formType: 'add' | 'edit') => {
    const parts = value.trim().split(' ')
    const ten = parts.pop() || ''
    const ho = parts.join(' ')

    if (formType === 'add') {
        setAddFormData(prev => ({ ...prev, ho, ten }))
    } else {
        setEditingEmployee(prev => prev ? ({ ...prev, ho, ten }) : null)
    }
  }

  const handleChange = (field: keyof Employee | keyof typeof initialFormData, value: string, formType: 'add' | 'edit') => {
    if (formType === 'add') {
        setAddFormData(prev => ({ ...prev, [field]: value }))
    } else {
        setEditingEmployee(prev => prev ? ({ ...prev, [field]: value }) : null)
    }
  }

  const handleDeleteEmployee = async (idNv: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
      deleteMutation.mutate(idNv);
    }
  };

  const handleEditClick = async (idNv: string) => {
    try {
        // Gọi API getInfoUser để lấy dữ liệu chi tiết
        const employeeData = await fetchUserInfoById(idNv);
        console.log(employeeData.data)
        // Cập nhật state để hiển thị trên form sửa
        if (employeeData.success) {
          await setEditingEmployee({
              ...(employeeData.data || {})?.user as Employee,
          });

          await setIsEditDialogOpen(true);
        }
    } catch (error: any) {
        alert(`Không thể tải thông tin nhân viên: ${error.message}`);
    }
  };

  // --- Render Functions ---

  const renderAddEmployeeForm = () => (
    <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
        <DialogHeader>
            <DialogTitle>Thêm Nhân Viên Mới{}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
            <div>
                <Label>Username</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  placeholder="abcd1234556"
                  value={addFormData.username}
                  onChange={(e) => handleChange('username', e.target.value, 'add')}
                  />
              </div>
              <div>
                <Label>Họ Tên</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  placeholder="Nguyễn Văn A"
                  onChange={(e) => handleFullNameChange(e.target.value, 'add')}
                  value={addFormData.ho + ' ' + addFormData.ten}
                  />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  placeholder="email@qkhotel.com"
                  onChange={(e) => handleChange('email', e.target.value, 'add')}
                  value={addFormData.email}
                  />
              </div>
              <div>
                <Label>Số Điện Thoại</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  placeholder="0901234567"
                  onChange={(e) => handleChange('sdt', e.target.value, 'add')}
                  value={addFormData.sdt}
                  />
              </div>
              <div>
                <Label>Bộ Phận</Label>
                <Select value={addFormData.idBp} onValueChange={(value) => handleChange('idBp', value, 'add')}>
                  <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                    <SelectValue placeholder="Chọn bộ phận" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                    <SelectItem value="BP2">Quản Trị</SelectItem>
                    <SelectItem value="BP1">Lễ Tân</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Mật Khẩu</Label>
                <Input
                  className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                  type="password"
                  placeholder="••••••••"
                  onChange={(e) => handleChange('password', e.target.value, 'add')}
                  value={addFormData.password}
                  />
              </div>
              <Button onClick={handleCreateEmployee} disabled={createMutation.isPending} className="w-full bg-blue-600 hover:bg-blue-700">
                {createMutation.isPending ? 'Đang thêm...' : 'Thêm Nhân Viên'}
              </Button>
            </div>
    </DialogContent>
  )

  const renderEditEmployeeForm = () => (
    <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
            <DialogHeader>
                <DialogTitle>Sửa Thông Tin Nhân Viên: {editingEmployee?.idNv}</DialogTitle>
            </DialogHeader>
            {editingEmployee ? (
                <div className="space-y-4">
                    {/* Username (thường là readonly) */}
                    <div>
                        <Label>Username1111</Label>
                        <Input
                            className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                            value={editingEmployee.username}
                            onChange={(e) => handleChange('username', e.target.value, 'edit')}
                        />
                    </div>
                    {/* Họ Tên */}
                    <div>
                        <Label>Họ Tên</Label>
                        <Input
                            className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                            placeholder="Nguyễn Văn A"
                            onChange={(e) => handleFullNameChange(e.target.value, 'edit')}
                            value={editingEmployee.ho + ' ' + editingEmployee.ten}
                        />
                    </div>
                    {/* Email */}
                    <div>
                        <Label>Email</Label>
                        <Input
                            className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                            placeholder="email@qkhotel.com"
                            onChange={(e) => handleChange('email', e.target.value, 'edit')}
                            value={editingEmployee.email}
                        />
                    </div>
                    {/* SĐT */}
                    <div>
                        <Label>Số Điện Thoại</Label>
                        <Input
                            className="bg-[#0a0a0a] border-[#2a2a2a] text-white"
                            placeholder="0901234567"
                            onChange={(e) => handleChange('sdt', e.target.value, 'edit')}
                            value={editingEmployee.sdt}
                        />
                    </div>
                    {/* Bộ Phận */}
                    <div>
                        <Label>Bộ Phận</Label>
                        <Select value={editingEmployee.idBp} onValueChange={(value) => handleChange('idBp', value, 'edit')}>
                            <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                                <SelectValue placeholder="Chọn bộ phận" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                                <SelectItem value="BP2">Quản Trị</SelectItem>
                                <SelectItem value="BP1">Lễ Tân</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {/* Nhóm quyền (idNq) */}
                     <div>
                        <Label>Nhóm Quyền</Label>
                        <Select value={editingEmployee.idNq} onValueChange={(value) => handleChange('idNq', value, 'edit')}>
                            <SelectTrigger className="bg-[#0a0a0a] border-[#2a2a2a] text-white">
                                <SelectValue placeholder="Chọn nhóm quyền" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a] text-white">
                                <SelectItem value="NQ1">Nhóm Quyền 1</SelectItem>
                                <SelectItem value="NQ2">Nhóm Quyền 2</SelectItem>
                                {/* Thêm các NQ khác nếu có */}
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogFooter>
                        <Button 
                            onClick={handleUpdateEmployee} 
                            disabled={updateMutation.isPending} 
                            className="w-full bg-green-600 hover:bg-green-700"
                        >
                            {updateMutation.isPending ? 'Đang cập nhật...' : 'Lưu Thay Đổi'}
                        </Button>
                    </DialogFooter>
                </div>
            ) : (
                <p>Đang tải dữ liệu nhân viên...</p>
            )}
        </DialogContent>
    </Dialog>
  )

  // --- Main Render ---

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#888888] mb-2">Quản Lý Nhân Viên</h1>
          <p className="text-gray-400">Quản lý nhân viên và phân quyền hệ thống</p>
        </div>
        {/* Dialog Thêm Nhân Viên */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Thêm Nhân Viên
            </Button>
          </DialogTrigger>
          {renderAddEmployeeForm()}
        </Dialog>
      </div>

      {/* Dialog Sửa Nhân Viên */}
      {renderEditEmployeeForm()}

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Object.entries(departmentConfig).map(([dept, config]) => {
          const count = employees?.filter((e) => e.idBp === dept).length
          return (
            <Card key={dept} className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
              <p className="text-gray-400 text-sm mb-1">{config.label}</p>
              <p className="text-2xl font-bold text-white">{count}</p>
            </Card>
          )
        })}
      </div>

      {/* Search */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input placeholder="Tìm kiếm nhân viên..." className="pl-10 bg-[#0a0a0a] border-[#2a2a2a] text-white" />
        </div>
      </Card>

      {/* Employees Table */}
      <Card className="bg-[#1a1a1a] border-[#2a2a2a]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-[#2a2a2a]">
              <tr>
                <th className="text-left p-4 text-gray-400 font-medium">Mã NV</th>
                <th className="text-left p-4 text-gray-400 font-medium">Họ Tên</th>
                <th className="text-left p-4 text-gray-400 font-medium">Liên Hệ</th>
                <th className="text-left p-4 text-gray-400 font-medium">Nhóm quyền</th>
                <th className="text-left p-4 text-gray-400 font-medium">Chức Vụ</th>
                <th className="text-left p-4 text-gray-400 font-medium">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {employees?.map((employee) => (
                <tr key={employee.idNv} className="border-b border-[#2a2a2a] hover:bg-[#0a0a0a]">
                  <td className="p-4 text-white font-semibold">{employee.idNv}</td>
                  <td className="p-4 text-white font-medium">{employee.ho + " " + employee.ten}</td>
                  <td className="p-4">
                    <div>
                      <p className="text-white text-sm">{employee.email}</p>
                      <p className="text-gray-400 text-sm">{employee.sdt}</p>
                    </div>
                  </td>
                  <td className="p-4 text-gray-400">{employee.idNq}</td>
                  <td className="p-4 text-white">
                      {/* @ts-ignore */}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[employee.idBp]?.color}`}>{statusConfig[employee.idBp as keyof typeof statusConfig]?.label}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {/* Nút Sửa Nhân Viên */}
                      <Button onClick={() => handleEditClick(employee.idNv)} size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-white">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button onClick={() => handleDeleteEmployee(employee.idNv)} size="icon" variant="ghost" className="h-8 w-8 text-gray-400 hover:text-red-500" disabled={deleteMutation.isPending}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
