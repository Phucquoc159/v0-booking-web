import { PhongWithRelations } from "@/lib/types/relations"
import { Card } from "@/components/ui/card"

const statusConfig = {
  available: { label: "Trống", color: "bg-green-500/10 text-green-500 border-green-500/20" },
  occupied: { label: "Đã Đặt", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
  dirty: { label: "Đang Dọn", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
  reserved: { label: "Đã Giữ", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
  maintenance: { label: "Bảo Trì", color: "bg-red-500/10 text-red-500 border-red-500/20" },
}

export default function RoomStatsPage({ rooms }: { rooms: PhongWithRelations[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {Object.entries(statusConfig).map(([status, config]) => {
        const count = rooms?.filter((r) => r.trangThai.tenTrangThai.toLowerCase() === status).length
        return (
          <Card key={status} className="bg-[#1a1a1a] border-[#2a2a2a] p-4">
            <p className="text-gray-400 text-sm mb-1">{config.label}</p>
            <p className="text-2xl font-bold text-white">{count}</p>
          </Card>
        )
      })}
    </div>
  )
}
