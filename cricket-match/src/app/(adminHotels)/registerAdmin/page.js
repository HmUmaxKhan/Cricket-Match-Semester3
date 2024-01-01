import Reginfo from "./(Reginfo)/Reginfo"
function page() {

  const background= {
    backgroundImage : 'url("/bgImage.jpg")',
    backgroundSize:'cover',
    minHeight:'100vh',
    width:'100%'
  }


  return (
    <div style={background}>
      <Reginfo />
    </div>
  )
}

export default page