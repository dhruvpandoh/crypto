
import './style.css'
import Draggable from 'react-draggable'
// import img1 from './image/FB.png';
const Card = () => {


    return (
        <>
            <div className='cardparent'>
                <Draggable>
                    
                    <div className='wrapper'>
                    <span className='cardTitle'>GOOGLE</span>
                    <img className="cardicon" src="./image/GOOGL.png" alt=""/>
                    <span className='cardPrice'>1515 USD</span>
                    </div>
                </Draggable>
                <Draggable>
                    <div className='wrapper'>
                    <span className='cardTitle'>FB</span>
                    <img className="cardicon" src="./image/FB.png" alt=""/>
                    <span className='cardPrice'>266 USD</span>
                    </div>
                </Draggable>
                <Draggable>
                    <div className='wrapper'>
                    <span className='cardTitle'>Amzn</span>
                    <img className="cardicon" src="./image/AMZN.svg" alt=""/>
                    <span className='cardPrice'>3116 USD</span>
                    </div>
                </Draggable>
            </div>


        </>
    )
}
export default Card