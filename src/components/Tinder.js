import React, { useState } from 'react';

const exampleDogs = [
  {
    name: "Max",
    breed: "Beagle",
    age: 3,
    size: "Pequeño",
    sex: "Macho",
    about: "Amo correr y jugar con niños.",
    interests: "Pelotas, agua, paseos",
    image: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop&q=60",
    comments: ["¡Qué tierno!", "Me encantaría conocerlo"]
  },
  {
    name: "Luna",
    breed: "Labrador",
    age: 2,
    size: "Grande",
    sex: "Hembra",
    about: "Soy tranquila y muy mimosa.",
    interests: "Dormir, mimos, pasear",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=500&auto=format&fit=crop&q=60",
    comments: ["¡Hermosa perrita!", "¿Le gusta jugar con otros perros?"]
  },
  {
    name: "Rocky",
    breed: "Bulldog",
    age: 4,
    size: "Mediano",
    sex: "Macho",
    about: "Dormilón profesional y fan de las siestas.",
    interests: "Comer, dormir, caminar lento",
    image: "https://images.unsplash.com/photo-1518715308788-3005759c41f0?w=500&auto=format&fit=crop&q=60",
    comments: []
  }
];

function Tinder() {
  const [current, setCurrent] = useState(0);
  const [showComments, setShowComments] = useState(false);
  const [cardAnim, setCardAnim] = useState('');
  const [likeAnim, setLikeAnim] = useState(false);

  const dog = exampleDogs[current] || null;

  const handleLike = () => {
    setLikeAnim(true);
    setCardAnim('card-like');
    setTimeout(() => {
      setLikeAnim(false);
      setCardAnim('');
      if (current < exampleDogs.length - 1) setCurrent(current + 1);
    }, 420);
  };
  const handleDislike = () => {
    setCardAnim('card-dislike');
    setTimeout(() => {
      setCardAnim('');
      if (current < exampleDogs.length - 1) setCurrent(current + 1);
    }, 420);
  };

  // Animaciones CSS in JS
  const animStyles = `
    @keyframes cardLike {
      0% { transform: scale(1) rotate(0deg); opacity:1; }
      60% { transform: scale(1.07) rotate(-3deg); }
      100% { transform: translateX(180px) scale(0.93) rotate(-8deg); opacity: 0; }
    }
    @keyframes cardDislike {
      0% { transform: scale(1) rotate(0deg); opacity:1; }
      60% { transform: scale(1.07) rotate(3deg); }
      100% { transform: translateX(-180px) scale(0.93) rotate(8deg); opacity: 0; }
    }
    .card-like {
      animation: cardLike 0.42s cubic-bezier(.4,2,.3,1) both;
    }
    .card-dislike {
      animation: cardDislike 0.42s cubic-bezier(.4,2,.3,1) both;
    }
    .like-pop {
      animation: likePop 0.32s cubic-bezier(.4,2,.3,1);
    }
    @keyframes likePop {
      0% { transform: scale(1); }
      40% { transform: scale(1.25); }
      70% { transform: scale(0.93); }
      100% { transform: scale(1); }
    }
  `;

  return (
    <div style={{minHeight:'100vh',background:'linear-gradient(120deg,#1a1a2e 0%,#23243a 100%)',width:'100vw'}}>
      <style>{animStyles}</style>
      <div className="top-bar" style={{width:'100vw',display:'flex',justifyContent:'flex-end',alignItems:'center',padding:'16px 32px 0 0',position:'absolute',top:0,right:0,zIndex:10}}>
        <a href="/petform" className="profile-link" style={{background:'#23243a',color:'#fff',textDecoration:'none',fontSize:'1.1em',fontWeight:'bold',borderRadius:'22px',padding:'8px 18px',border:'2px solid #ff6b6b',transition:'background .2s, color .2s'}}>👤 Mi Perfil</a>
      </div>
      <div className="main-tinder-center" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',minHeight:'100vh',width:'100vw',margin:0,padding:0}}>
        <div className="card-container" style={{position:'relative',width:'100%',maxWidth:'410px',height:'590px',marginBottom:'40px'}}>
          {dog ? (
            <div className={`pet-card ${cardAnim}`} style={{position:'relative',margin:'auto',width:'410px',maxWidth:'97vw',height:'590px',borderRadius:'36px',overflow:'hidden',background:'linear-gradient(120deg,#23243a 60%,#1a1a2e 100%)',boxShadow:'0 16px 48px #ff6b6b55,0 2px 10px #0004',transition:'transform 0.45s cubic-bezier(.4,2,.3,1), box-shadow 0.25s',cursor:'grab',userSelect:'none',display:'flex',flexDirection:'column',zIndex:2,border:'2.5px solid #ff6b6b44'}}>
              <img src={dog.image} alt={dog.name} style={{width:'100%',height:'320px',objectFit:'cover',borderBottom:'3px solid #ff6b6b44',boxShadow:'0 2px 8px #ff6b6b22',background:'#1a1a2e'}} />
              <div className="pet-info" style={{padding:'28px 26px 18px 26px',flex:1,display:'flex',flexDirection:'column',gap:'10px',justifyContent:'flex-start',color:'#fff'}}>
                <h2 style={{margin:'0 0 5px 0',color:'#ff6b6b',fontSize:'1.5em'}}>{dog.name}, {dog.age}</h2>
                <p style={{marginBottom:'10px',color:'#ccc',fontSize:'1em'}}>{dog.breed} • {dog.size} • {dog.sex}</p>
                <p style={{marginBottom:'16px'}}>{dog.about}</p>
                <button className="comments-btn" style={{display:'block',margin:'0 auto 10px auto',background:'#ff6b6b',color:'#fff',border:'none',borderRadius:'20px',padding:'7px 18px',fontSize:'15px',cursor:'pointer',boxShadow:'0 2px 8px #ff6b6b33',transition:'background 0.2s'}} onClick={()=>setShowComments(true)}>💬 Comentarios</button>
              </div>
            </div>
          ) : (
            <div className="pet-card"><div className="pet-info"><h2>¡No hay más perros!</h2><p>Vuelve más tarde para conocer más amigos peludos.</p></div></div>
          )}
        </div>
        <div className="action-btns" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'36px',marginTop:'40px',marginBottom:'10px',width:'100vw',position:'relative',zIndex:3}}>
          <button className="dislike-btn" style={{width:'68px',height:'68px',borderRadius:'50%',border:'2.5px solid #ff6b6b',fontSize:'32px',background:'#23243a',color:'#ff6b6b',boxShadow:'0 2px 14px #ff6b6b22',cursor:'pointer',transition:'background 0.2s, transform 0.13s',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={handleDislike}>✖️</button>
          <button className={`like-btn${likeAnim ? ' like-pop' : ''}`} style={{width:'68px',height:'68px',borderRadius:'50%',border:'2.5px solid #4cd964',fontSize:'32px',background:'#4cd964',color:'white',boxShadow:'0 2px 14px #ff6b6b22',cursor:'pointer',transition:'background 0.2s, transform 0.13s',display:'flex',alignItems:'center',justifyContent:'center'}} onClick={handleLike}>❤️</button>
        </div>
        {showComments && dog && (
          <div style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.22)',zIndex:100,display:'flex',alignItems:'center',justifyContent:'center'}}>
            <div style={{background:'#fff',borderRadius:'22px',boxShadow:'0 8px 40px #ff6b6b55,0 2px 10px #0002',padding:'26px 22px 16px 22px',maxWidth:'340px',width:'96vw',minHeight:'120px',position:'relative'}}>
              <button style={{position:'absolute',top:'12px',right:'12px',background:'#ff6b6b',color:'#fff',border:'none',borderRadius:'50%',width:'32px',height:'32px',fontSize:'20px',cursor:'pointer',boxShadow:'0 2px 8px #ff6b6b33',transition:'background 0.2s'}} onClick={()=>setShowComments(false)}>&times;</button>
              <h3 style={{margin:'0 0 12px 0',color:'#ff6b6b',fontSize:'1.2em',textAlign:'center'}}>Comentarios sobre {dog.name}</h3>
              <div className="comments-list">
                {(dog.comments && dog.comments.length ? dog.comments : [
                  '¡'+dog.name+' es adorable! 😍',
                  'Me encantaría que '+dog.name+' y mi perro sean amigos.',
                  '¡Qué energía tan linda tiene!'])
                  .map((c,i)=>(<div key={i} className="comment" style={{borderBottom:'1px solid #eee',padding:'7px 0',fontSize:'15.5px',color:'#444'}}>{c}</div>))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tinder;
