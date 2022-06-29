import { BsFillTrashFill } from 'react-icons/bs';
import styles from '../projects/ProjectCard.module.css'

const ServiceCard = ({ id, name, description, cost, handleRemove }) => {

  const remove = (event) => {
    event.preventDefault();
    handleRemove(id, cost)
  }

  return (
    <div className={styles.projectCard }>
      <h4>{ name }</h4>
      <p><span>Custo total:</span> R${ cost }</p>
      <p>{ description }</p>
      <div className={ styles.projectCardActions }>
        <button onClick={ remove }>
          <BsFillTrashFill />
          Excluir
        </button>
      </div>
    </div>
  )
}

export default ServiceCard