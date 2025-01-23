<template>
    <div class="modal-overlay">
      <div class="modal">
        <p>Are you sure you want to delete this post?</p>
        <button @click="$emit('confirm')" class="modal-confirm">Yes, delete</button>
        <button @click="$emit('cancel')" class="modal-cancel">Cancel</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal {
    background: #1a1a1a;
    padding: 20px;
    border-radius: 12px;
    text-align: center;
  }
  
  .modal p {
    margin-bottom: 20px;
  }
  
  .modal-confirm,
  .modal-cancel {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    margin: 5px;
  }
  
  .modal-confirm {
    background-color: #cf6679;
    color: white;
  }
  
  .modal-cancel {
    background-color: #03dac6;
    color: black;
  }
  </style>