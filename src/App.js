
import './App.css';
import  React,{useEffect,useState} from 'react'
import {Card,CardGroup,Col,Row,Form} from 'react-bootstrap';
import axios from 'axios'
function App() {
	const [latest,setLatest]=useState([]);
	const [result,setResult]=useState([]);
	const [searchCountries,setSearchCountries]=useState([""]);
	useEffect(()=>{
		axios.all([
		axios.get("https://corona.lmao.ninja/v3/covid-19/all"),
		axios.get("https://corona.lmao.ninja/v3/covid-19/countries")
		])
		
		.then(responseArr=>{
			setLatest(responseArr[0].data);
			setResult(responseArr[1].data);
		}).catch(err=>{
			console.log(err);
		})
	},[])
	const date=new Date(parseInt(latest.updated));
	const lastUpdate=date.toString();
	
	const filterCountries=result.filter(item=>{
	return searchCountries!==" "?
	item.country.includes(searchCountries):item;
		
	});
	const countries=filterCountries.map((data,i)=>{
		return(
			<Card
			key={i}
			bg="light"
			text="dark"
			className="text-center"
			style={{margin:"10px",minWidth:"500px",minHeight:"500px",float:"left",marginRight:"150px"}}
			>
			<Card.Img varient="top" src={data.countryInfo.flag}/>
			<Card.Body>
			<Card.Title> {data.country}</Card.Title>
			<Card.Text>Cases {data.cases}</Card.Text>
			<Card.Title>Deaths {data.deaths}</Card.Title>
			<Card.Text>RecoveredCases {data.recovered}</Card.Text>
			<Card.Title>Today-Case {data.todayCases}</Card.Title>
			<Card.Text>Today-Deaths {data.todayDeaths}</Card.Text>
			<Card.Title> Active {data.active}</Card.Title>
			<Card.Text> CriticalCases {data.critical}</Card.Text>
			</Card.Body>
			</Card>
			
		)
	})
		
  return (
    <div className="App">
	  <br/>
	  <h2 style={{textAlign:"center"}}>Covid-19 Live State</h2>
     <CardGroup >
  <Card bg="secondary" text="white" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Cases</Card.Title>
      <Card.Text>
       {latest.cases}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last Update {lastUpdate}</small>
    </Card.Footer>
  </Card>
	  
  <Card bg="danger" style={{margin:"10px"}}>
    <Card.Body>
      <Card.Title>Deaths</Card.Title>
      <Card.Text>
        {latest.deaths}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdate}</small>
    </Card.Footer>
  </Card>
	  
	  
  <Card bg="success" style={{margin:"10px"}} >
    <Card.Body>
      <Card.Title>Recoverd</Card.Title>
      <Card.Text>
        {latest.recovered}
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <small>Last updated {lastUpdate}</small>
    </Card.Footer>
  </Card>
	  
	  
	<Form>
  <Form.Group controlId="formGroupSearch">
    <Form.Label>Search</Form.Label>
    <Form.Control 
	type="text" 
	placeholder="search country" 
	onChange={e=>setSearchCountries(e.target.value)}
	/>
  </Form.Group>
</Form>
</CardGroup>
	  <br/><br/>
	  
	{countries}

 </div>
  );
}


export default App;
