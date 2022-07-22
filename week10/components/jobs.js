import Job from 'components/Job'

const Jobs = ({ jobs, isDashboard }) => {
 if (!jobs) return null
 //Job es un componente al cual como parametros le paso job que sera un objeto que contendra 
 //informacion como ser titulo del empleo, descripcion, etc
  return (
    <>
      {jobs.map((job, index) => (
        <Job key={index} job={job} isDashboard={isDashboard} />
      ))}
    </>
  )
}

export default Jobs