import React from 'react'

const Maap = () => {
  return (
    <>


{/* You can open the modal using ID.showModal() method */}
<dialog id="my_modal_4" className="modal">
  <form method="dialog" className="modal-box w-11/12 max-w-5xl">
    <h3 className="font-bold text-lg">Helloxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx!</h3>
    <p className="py-4">Click the button below to close</p>
    <div className="modal-action">
      {/* if there is a button, it will close the modal */}
      <button className="btn">Close</button>
    </div>
  </form>
</dialog>
</>);
};

export default Maap;