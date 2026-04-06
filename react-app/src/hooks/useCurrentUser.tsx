import React, { createContext, useContext, useState } from 'react'

export interface UserAccount {
  id: string
  avatar: string
  name: string
  title: string
  dept: string
  role: 'van-thu' | 'giam-doc' | 'thu-ky' | 'xu-ly'
}

export const ACCOUNTS: UserAccount[] = [
  // ── Văn thư: thấy toàn bộ hệ thống ──────────────────────────────────────────
  { id: 'nguyen-thi-vt',  avatar: 'VT', name: 'Nguyễn Thị Văn Thư',   title: 'Văn thư',              dept: 'Văn phòng',  role: 'van-thu'  },
  // ── Giám đốc: ký duyệt & chỉ đạo ────────────────────────────────────────────
  { id: 'le-van-gd',      avatar: 'GĐ', name: 'Lê Văn Giám Đốc',       title: 'Giám đốc',             dept: 'BGĐ',        role: 'giam-doc' },
  // ── Thư ký: điều phối VB đến, duyệt VB đi ───────────────────────────────────
  { id: 'tran-thi-tk',    avatar: 'TK', name: 'Trần Thị Thư Ký',        title: 'Thư ký – Điều phối',   dept: 'Văn phòng',  role: 'thu-ky'   },
  // ── Chuyên viên xử lý (3 người, mỗi người thấy VB mình liên quan) ───────────
  { id: 'nguyen-van-a',   avatar: 'NA', name: 'Nguyễn Văn A',            title: 'Chuyên viên KHTH',     dept: 'P. KHTH',    role: 'xu-ly'    },
  { id: 'tran-thi-c',     avatar: 'TC', name: 'Trần Thị C',              title: 'Chuyên viên HCNS',     dept: 'P. HCNS',    role: 'xu-ly'    },
  { id: 'pham-van-cu',    avatar: 'PC', name: 'Phạm Văn Xử Lý',          title: 'Chuyên viên CNTT',     dept: 'P. CNTT',    role: 'xu-ly'    },
]

interface CurrentUserContextType {
  currentUser: UserAccount
  setCurrentUser: (user: UserAccount) => void
}

const CurrentUserContext = createContext<CurrentUserContextType | null>(null)

export function CurrentUserProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<UserAccount>(ACCOUNTS[0])
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </CurrentUserContext.Provider>
  )
}

export function useCurrentUser() {
  const ctx = useContext(CurrentUserContext)
  if (!ctx) throw new Error('useCurrentUser must be used within CurrentUserProvider')
  return ctx
}
