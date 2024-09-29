function Error({ message }) {
    return (
      <div className="error">
        <h2>Oops, something went wrong!</h2>
        {message && <p>{message}</p>}
      </div>
    );
  }
  
  export default Error;