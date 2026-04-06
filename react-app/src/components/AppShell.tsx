import Sidebar from '@/components/Sidebar'
import { useNavigation } from '@/hooks/useNavigation'

// Screens – vb-den
import S1DanhSach from '@/screens/vb-den/S1DanhSach'
import S2TiepNhan from '@/screens/vb-den/S2TaoVbDen'
import S3ChiTiet from '@/screens/vb-den/chi-tiet/S3ChiTiet'
// mau_luong
import ML1DanhSach from '@/screens/mau_luong/ML1DanhSach'
import ML2TaoChinhSua from '@/screens/mau_luong/ML2TaoChinhSua'
import ML3ChiTiet from '@/screens/mau_luong/ML3ChiTiet'
// vb-di
import S8DanhSach from '@/screens/vb-di/S8DanhSach'
import S9SoanThao from '@/screens/vb-di/S9SoanThao'
import S10DuyetSongSong from '@/screens/vb-di/S10DuyetSongSong'
import S11KySo from '@/screens/vb-di/S11KySo'
import S12CapSoBanHanh from '@/screens/vb-di/S12CapSoBanHanh'
import S13DaBanHanh from '@/screens/vb-di/S13DaBanHanh'
// noi-bo
import S14DanhSach from '@/screens/noi-bo/S14DanhSach'
import S15TaoMoi from '@/screens/noi-bo/S15TaoMoi'
// ho-so
import S16DanhSach from '@/screens/ho-so/S16DanhSach'
import S17TaoHoSo from '@/screens/ho-so/S17TaoHoSo'
import S18ChiTiet from '@/screens/ho-so/S18ChiTiet'
import S19NopLuu from '@/screens/ho-so/S19NopLuu'
// so-bc
import S20SoDangKy from '@/screens/so-bc/S20SoDangKy'
import S21CauHinhSo from '@/screens/so-bc/S21CauHinhSo'
import S22BaoCao from '@/screens/so-bc/S22BaoCao'

const SCREEN_MAP: Record<string, React.ComponentType> = {
  s1: S1DanhSach,
  s2: S2TiepNhan,
  s3: S3ChiTiet,
  ml1: ML1DanhSach,
  ml2: ML2TaoChinhSua,
  ml3: ML3ChiTiet,
  s8: S8DanhSach,
  s9: S9SoanThao,
  s10: S10DuyetSongSong,
  s11: S11KySo,
  s12: S12CapSoBanHanh,
  s13: S13DaBanHanh,
  s14: S14DanhSach,
  s15: S15TaoMoi,
  s16: S16DanhSach,
  s17: S17TaoHoSo,
  s18: S18ChiTiet,
  s19: S19NopLuu,
  s20: S20SoDangKy,
  s21: S21CauHinhSo,
  s22: S22BaoCao,
}

export default function AppShell() {
  const { currentScreen } = useNavigation()
  const ScreenComponent = SCREEN_MAP[currentScreen] ?? S1DanhSach

  return (
    <div className="app-shell">
      <Sidebar />
      <main style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <ScreenComponent />
      </main>
    </div>
  )
}
