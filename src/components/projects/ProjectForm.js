import React from 'react';
import styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

const ProjectForm = ({ handleSubmit, btnText, projectData }) => {

  const [ categories, setCategories ] = React.useState([]);
  const [ project, setProject ] = React.useState(projectData || {});
  const url = "http://localhost:5000/categories";

  React.useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((data) => {
      setCategories(data);
    })
    .catch(err => console.log(err));
  }, []);

  const submit = (event) => {
    event.preventDefault();
    handleSubmit(project);
  }

  function handleChange(event) {
    setProject({ ...project, [event.target.name]: event.target.value });
  }

  function handleCategory(event) {
    setProject({
      ...project,
      category: {
        id: event.target.value,
        name: event.target.options[event.target.selectedIndex].text,
      },
    })
  }

  return (
    <>
      <form onSubmit={ submit } className={ styles.form }>
        <Input
        type="text"
        text="Nome do projeto:"
        name="name"
        placeholder="Insira o nome do projeto"
        value={ project.name }
        handleOnChange={ handleChange }
        />
        <Input
        type="number"
        text="Orçamento do projeto:"
        name="budget"
        placeholder="Insira o orçamento total:"
        value={ project.budget }
        handleOnChange={ handleChange }
        />
        <Select
        name="category_id"
        text="Selecione a categoria"
        options={ categories }
        value={ project.category ? project.category.id : '' }
        handleOnChange={ handleCategory }
        />
        <SubmitButton text={ btnText }/>
      </form>
    </>
  )
}

export default ProjectForm