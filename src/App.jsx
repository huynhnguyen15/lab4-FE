import { useEffect, useState } from "react"

const API_BASE = import.meta.env.VITE_API_BASE

function App() {
  const [username, setUsername] = useState("")
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/user`)
      const data = await res.json()
      setUsers(data)
    } catch (err) {
      alert("Lỗi gọi API")
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!username) return

    try {
      setLoading(true)
      await fetch(`${API_BASE}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ name: username })
      })

      setUsername("")
      fetchUsers()
    } catch (err) {
      alert("Lỗi đăng ký user")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>User Registration</h1>

      <form onSubmit={handleRegister} style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Nhập username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: 8, marginRight: 10 }}
        />
        <button type="submit" disabled={loading} style={{ padding: 8 }}>
          {loading ? "Đang xử lý..." : "Đăng ký"}
        </button>
      </form>

      <h2>Danh sách user đã đăng ký</h2>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>UUID</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id?.S || user.uuid}>
              <td>{user.id?.S || user.uuid}</td>
              <td>{user.name?.S || user.username}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default App