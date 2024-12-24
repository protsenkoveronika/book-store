<template>
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <div class="add-book-container">
    <h1>Add new book</h1>
    <form @submit.prevent="submitForm" class="form">
      <div class="image-upload">
        <img v-if="book.photoPreview" :src="book.photoPreview" @click="removePhoto" alt="Book image" />
        <div v-else>
          <label for="photo" class="image-placeholder">
            <i class="fas fa-plus"></i>
            <span>Choose photo</span>
          </label>
          <input type="file" id="photo" @change="handlePhotoChange" class="file-input" accept="image/*" @input="clearValidationError('photo')"/>
          <p v-if="validationErrors.photo" class="error-message">
            {{ validationErrors.photo }}
          </p>
        </div>
      </div>
      <div class="column">
        <div class="form-fields">
          <div class="name-section">
            <div class="form-group">
              <label for="name">Book name</label>
              <input v-model="book.name" type="text" id="name" placeholder="Book Name" @input="clearValidationError('name')"/>
              <p v-if="validationErrors.name" class="error-message">{{ validationErrors.name }}</p>
            </div>
            <div class="form-group">
              <label for="author">Author</label>
              <input v-model="book.author" type="text" id="author" placeholder="Book Author" @input="clearValidationError('author')"/>
              <p v-if="validationErrors.author" class="error-message">{{ validationErrors.author }}</p>
            </div>
          </div>
          <div class="form-group">
            <label for="location">Location</label>
            <input v-model="book.location" type="text" id="location" placeholder="Your Location" @input="clearValidationError('location')"/>
            <p v-if="validationErrors.location" class="error-message">{{ validationErrors.location }}</p>
          </div>
          <div class="form-group" style="width: 100%">
            <label for="description">Description</label>
            <textarea v-model="book.description" id="description" @input="adjustHeight(); clearValidationError('description')" ref="textarea" placeholder="Book Description"></textarea>
            <p v-if="validationErrors.description" class="error-message">{{ validationErrors.description }}</p>
          </div>
          <div class="form-group">
            <label for="phone">Contact phone number</label>
            <input v-model="book.contactPhone" type="tel" id="phone" placeholder="Your Phone Number" @input="clearValidationError('contactPhone')"/>
            <p v-if="validationErrors.contactPhone" class="error-message">{{ validationErrors.contactPhone }}</p>
          </div>
        </div>
        <div class="button">
          <button type="submit" class="btn">Add</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import BooksService from "@/services/BooksService";
import {mapState} from "vuex";

export default {
  name: "AddBook",
  data() {
    return {
      book: {
        name: "",
        author: "",
        location: "",
        description: "",
        contactPhone: "",
        photo: null,
        photoPreview: null,
        photoFile: null,
      },
      validationErrors: {
        name: "",
        author: "",
        location: "",
        description: "",
        contactPhone: "",
        photo: "",
      },
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    handlePhotoChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.book.photoPreview = e.target.result; // Use for preview
        };
        reader.readAsDataURL(file);
        this.book.photoFile = file; // Store the File object
      }
    },
    adjustHeight() {
      const textarea = this.$refs.textarea;
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    },
    validateForm() {
      let isValid = true;
      this.validationErrors = {
        name: "",
        author: "",
        location: "",
        description: "",
        contactPhone: "",
        photo: "",
      };

      if (!this.book.name.trim()) {
        isValid = false;
        this.validationErrors.name = "Book name is required.";
      }

      if (!this.book.author.trim()) {
        isValid = false;
        this.validationErrors.author = "Author name is required.";
      }

      if (!this.book.location.trim()) {
        isValid = false;
        this.validationErrors.location = "Location is required.";
      }

      if (!this.book.description.trim()) {
        isValid = false;
        this.validationErrors.description = "Description is required.";
      }

      if (!this.book.contactPhone.trim()) {
        isValid = false;
        this.validationErrors.contactPhone = "Contact phone number is required.";
      } else if (!/^\+?\d{10,15}$/.test(this.book.contactPhone)) {
        isValid = false;
        this.validationErrors.contactPhone = "Enter a valid phone number.";
      }

      if (!this.book.photoFile) {
        isValid = false;
        this.validationErrors.photo = "A photo is required.";
      }

      return isValid;
    },
    async submitForm() {
      if (!this.user) {
        alert("You must be logged in to create a book.");
        return;
      }

      const isValid = this.validateForm();
      if (!isValid) {
        return;
      }

      try {
        const formData = new FormData();

        formData.append("name", this.book.name);
        formData.append("author", this.book.author);
        formData.append("location", this.book.location);
        formData.append("description", this.book.description);
        formData.append("contactPhone", this.book.contactPhone);
        formData.append("owner", this.user.id);
        if (this.book.photoFile) {
          formData.append("photo", this.book.photoFile);
        }

        await BooksService.create(formData);

        this.resetForm();
        alert("Book created successfully!");
      } catch (error) {
        console.error("Error creating book:", error);
        alert("Failed to create the book.");
      }
    },

    resetForm() {
      this.book = {
        name: "",
        author: "",
        location: "",
        description: "",
        contactPhone: "",
        photo: null,
      };
      this.validationErrors = {
        name: "",
        author: "",
        location: "",
        description: "",
        contactPhone: "",
        photo: "",
      };
    },
    clearValidationError(field) {
      this.validationErrors[field] = '';
    },
    removePhoto() {
      this.book.photoPreview = null;
      this.book.photoFile = null;
    },
  },
  mounted() {
    this.adjustHeight();
  },
};
</script>



<style scoped>
.add-book-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 0;
}

h1 {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
}

.form {
  display: flex;
  gap: 30px;
  width: 100%;
}

.column {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
  min-height: 378px;
  width: 100%;
}

.image-upload {
  text-align: center;
}

.image-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 270px;
  height: 378px;
  border: 2px dashed #d3d3d3;
  cursor: pointer;
  color: #6c6c6c;
}

img {
  height: 378px;
  width: 270px;
  cursor: pointer;
}

.image-placeholder i {
  font-size: 40px;
}

.image-placeholder span {
  margin-top: 10px;
  font-size: 14px;
}

.file-input {
  display: none;
}

.name-section {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.form-group {
  width: 49%;
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 0;
  font-size: small;
}

input {
  width: 100%;
  padding: 7px;
  font-size: small;
}

textarea {
  width: 100%;
  resize: none;
  overflow: hidden;
  font-size: small;
  padding: 7px;
}

.button {
  display: flex;
  justify-content: center;
  padding: 0;
}

.btn {
  border: none;
  background: #3A2970;
  border-radius: 30px;
  padding: 5px 100px;
  margin-top: 20px;
  color: white;
}

.btn:hover {
  background: #4c3991;
  color: white;
}

.btn:focus {
  outline: none;
  box-shadow: none;
  background: #3A2970;
}

.error-message {
  color: red;
  font-size: small;
  margin: 1px 0;
}

</style>