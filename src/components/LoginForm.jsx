function LoginForm() {

  return (

    <div className="w-100">

      <h3 className="mb-3 text-center">Login</h3>

      {/* USERNAME */}
      <div className="mb-3 text-start">

        <label className="form-label small fw-semibold text-secondary">
          USERNAME
        </label>

        <input
          type="text"
          className="form-control"
          placeholder="Admin1"
          style={{
            background:"#e9edf5",
            border:"none"
          }}
        />

      </div>

      {/* PASSWORD */}
      <div className="mb-2 text-start">

        <label className="form-label small fw-semibold text-secondary">
          PASSWORD
        </label>

        <input
          type="password"
          className="form-control"
          style={{
            background:"#e9edf5",
            border:"none"
          }}
        />

      </div>

      <button
        className="btn w-100 text-white"
        style={{
          background:"#f7931e",
          borderRadius:"8px",
          marginTop:"25px"
        }}
      >
        Login
      </button>

    </div>

  )
}

export default LoginForm