import toast from "react-hot-toast";
import css from "./SearchForm.module.css";

export default function SearchForm({ onSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchQuery = form.search.value.trim();

    if (searchQuery === "") {
      toast.error("The search field is empty. Please enter a search value!", {
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "#d92b2b",
          color: "#ffffff",
        },
      });
    } else {
      onSubmit(searchQuery);
    }
    form.reset();
  };

  return (
    <form className={css.form} onSubmit={handleFormSubmit}>
      <input
        className={css.input}
        type="text"
        name="search"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
      <button type="submit">Search</button>
    </form>
  );
}
