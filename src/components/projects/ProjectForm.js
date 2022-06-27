import React from 'react';
import styles from './ProjectForm.module.css';
import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';

const ProjectForm = ({ btnText }) => {

  // trecho de código que puxa os dados da API usando 'useEffect', e usando 'useState' para rendenrizar as opções a API diremente na página de novos projetos.
  // para iniciar o projeto e carregar os dados do 'db.json', execute 'npm run backend' no terminal

  const [ categories, setCategories ] = React.useState([]);
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

  return (
    <>
      <form className={ styles.form }>
        <Input
        type="text"
        text="Nome do projeto:"
        name="name"
        placeholder="Insira o nome do projeto"
        />
        <Input
        type="number"
        text="Orçamento do projeto:"
        name="budget"
        placeholder="Insira o orçamento total:"
        />
        <Select
        name="category_id"
        text="Selecione a categoria"
        options={ categories }
          
        />
        <SubmitButton text={ btnText }/>
      </form>
    </>
  )
}

export default ProjectForm