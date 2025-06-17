import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function PetForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    breed: '',
    age: '',
    size: '',
    sex: '',
    about: '',
    pedigree: '',
    interests: '',
    photo: '',
  });
  const [editMode, setEditMode] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [profileLoaded, setProfileLoaded] = useState(false);
  const fileInput = useRef(null);

  useEffect(() => {
    const profile = localStorage.getItem('dogProfile');
    if (profile) {
      setForm(JSON.parse(profile));
      setEditMode(false);
      setProfileLoaded(true);
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleFile = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = evt => {
        setForm(f => ({ ...f, photo: evt.target.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      localStorage.setItem('dogProfile', JSON.stringify(form));
      setEditMode(false);
      setSuccess('¡Perfil guardado!');
      setTimeout(() => setSuccess(''), 1200);
    } catch (err) {
      setError('Error al guardar el perfil');
    }
  };

  const handleEdit = () => setEditMode(true);

  return (
    <div>
      <div className="top-bar" style={{width:'100vw',display:'flex',justifyContent:'flex-start',alignItems:'center',padding:'16px 0 0 32px',position:'absolute',top:0,left:0,zIndex:10}}>
  <button
    type="button"
    onClick={()=>navigate('/tinder')}
    className="back-link"
    style={{
      background:'#23243a',
      color:'#fff',
      textDecoration:'none',
      fontSize:'1.1em',
      fontWeight:'bold',
      borderRadius:'22px',
      padding:'8px 18px',
      border:'2px solid #ff6b6b',
      transition:'background .2s, color .2s',
      cursor:'pointer',
      minWidth:'unset',
      width:'auto',
      display:'inline-block',
      boxSizing:'border-box',
      margin:0
    }}
  >⏪ Volver a Tarjetas</button>
</div>
      <div className="container" style={{maxWidth:'420px',margin:'40px auto',background:'rgba(255,255,255,0.13)',borderRadius:'28px',boxShadow:'0 8px 40px #ff6b6b33, 0 2px 10px #0003',padding:'36px 28px 28px 28px',width:'96vw'}}>
        <h1 style={{color:'#ff6b6b',textAlign:'center',letterSpacing:'1px',fontSize:'2em',marginBottom:'12px'}}>Perfil de mi Perro 🐶</h1>
        <form onSubmit={handleSubmit} style={{marginTop:'6px'}}>
          <div className="form-group" style={{marginBottom:'18px'}}>
            <label htmlFor="name" style={{fontWeight:'bold',display:'block',marginBottom:'5px',color:'#fff'}}>Nombre</label>
            <input style={{width:'100%',padding:'12px',border:'none',borderRadius:'9px',fontSize:'16px',background:'#23243a',color:'#fff',boxShadow:'0 2px 10px #0002',outline:'none',marginTop:'3px'}} type="text" id="name" name="name" value={form.name} onChange={handleChange} required disabled={!editMode} />
          </div>
          <div className="form-group" style={{marginBottom:'18px'}}>
            <label htmlFor="breed" style={{fontWeight:'bold',display:'block',marginBottom:'5px',color:'#fff'}}>Raza</label>
            <input style={{width:'100%',padding:'12px',border:'none',borderRadius:'9px',fontSize:'16px',background:'#23243a',color:'#fff',boxShadow:'0 2px 10px #0002',outline:'none',marginTop:'3px'}} type="text" id="breed" name="breed" value={form.breed} onChange={handleChange} required disabled={!editMode} />
          </div>
          <div className="form-group" style={{marginBottom:'18px'}}>
            <label htmlFor="age" style={{fontWeight:'bold',display:'block',marginBottom:'5px',color:'#fff'}}>Edad (años)</label>
            <input style={{width:'100%',padding:'12px',border:'none',borderRadius:'9px',fontSize:'16px',background:'#23243a',color:'#fff',boxShadow:'0 2px 10px #0002',outline:'none',marginTop:'3px'}} type="number" id="age" name="age" min="0" value={form.age} onChange={handleChange} required disabled={!editMode} />
          </div>
          <div className="form-group" style={{marginBottom:'18px'}}>
            <label htmlFor="size" style={{fontWeight:'bold',display:'block',marginBottom:'5px',color:'#fff'}}>Tamaño</label>
            <select style={{width:'100%',padding:'12px',border:'none',borderRadius:'9px',fontSize:'16px',background:'#23243a',color:'#fff',boxShadow:'0 2px 10px #0002',outline:'none',marginTop:'3px'}} id="size" name="size" value={form.size} onChange={handleChange} required disabled={!editMode}>
              <option value="">Selecciona...</option>
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
          </div>
          <div className="form-group" style={{marginBottom:'18px'}}>
            <label htmlFor="sex" style={{fontWeight:'bold',display:'block',marginBottom:'5px',color:'#fff'}}>Sexo</label>
            <select style={{width:'100%',padding:'12px',border:'none',borderRadius:'9px',fontSize:'16px',background:'#23243a',color:'#fff',boxShadow:'0 2px 10px #0002',outline:'none',marginTop:'3px'}} id="sex" name="sex" value={form.sex} onChange={handleChange} required disabled={!editMode}>
              <option value="">Selecciona...</option>
              <option value="Macho">Macho</option>
              <option value="Hembra">Hembra</option>
            </select>
          </div>
          <div className="form-group" style={{marginBottom:'18px'}}>
            <label htmlFor="about" style={{fontWeight:'bold',display:'block',marginBottom:'5px',color:'#fff'}}>Sobre mí</label>
            <textarea style={{width:'100%',padding:'12px',border:'none',borderRadius:'9px',fontSize:'16px',background:'#23243a',color:'#fff',boxShadow:'0 2px 10px #0002',outline:'none',marginTop:'3px'}} id="about" name="about" rows="3" maxLength="200" value={form.about} onChange={handleChange} placeholder="¡Cuéntales a todos cómo es tu perro!" disabled={!editMode}></textarea>
          </div>
          <div className="form-group" style={{marginBottom:'18px'}}>
            <label htmlFor="pedigree" style={{fontWeight:'bold',display:'block',marginBottom:'5px',color:'#fff'}}>¿Tiene pedigree?</label>
            <select style={{width:'100%',padding:'12px',border:'none',borderRadius:'9px',fontSize:'16px',background:'#23243a',color:'#fff',boxShadow:'0 2px 10px #0002',outline:'none',marginTop:'3px'}} id="pedigree" name="pedigree" value={form.pedigree} onChange={handleChange} required disabled={!editMode}>
              <option value="">Selecciona...</option>
              <option value="Sí">Sí</option>
              <option value="No">No</option>
            </select>
          </div>
          <div className="form-group" style={{marginBottom:'18px'}}>
            <label htmlFor="interests" style={{fontWeight:'bold',display:'block',marginBottom:'5px',color:'#fff'}}>Intereses</label>
            <input style={{width:'100%',padding:'12px',border:'none',borderRadius:'9px',fontSize:'16px',background:'#23243a',color:'#fff',boxShadow:'0 2px 10px #0002',outline:'none',marginTop:'3px'}} type="text" id="interests" name="interests" value={form.interests} onChange={handleChange} placeholder="Ej: Pasear, jugar con pelotas, dormir..." disabled={!editMode} />
          </div>
          <div className="form-group" style={{marginBottom:'18px'}}>
            <label htmlFor="photo" style={{fontWeight:'bold',display:'block',marginBottom:'5px',color:'#fff'}}>Foto de perfil</label>
            <input style={{width:'100%',padding:'12px',border:'none',borderRadius:'9px',fontSize:'16px',background:'#23243a',color:'#fff',boxShadow:'0 2px 10px #0002',outline:'none',marginTop:'3px'}} type="file" id="photo" name="photo" accept="image/*" onChange={handleFile} ref={fileInput} disabled={!editMode} />
            {form.photo && <img className="profile-pic-preview" src={form.photo} alt="Preview" style={{display:'block',margin:'0 auto 15px auto',maxWidth:'180px',maxHeight:'180px',borderRadius:'50%',objectFit:'cover',border:'2px solid #ff6b6b',boxShadow:'0 2px 8px #ff6b6b44'}} />}
          </div>
          {editMode && <button type="submit" style={{background:'linear-gradient(90deg, #ff6b6b 65%, #4cd964 100%)',color:'#fff',border:'none',padding:'13px 0',width:'100%',borderRadius:'9px',fontSize:'17px',fontWeight:'bold',cursor:'pointer',marginTop:'12px',boxShadow:'0 2px 8px #ff6b6b22',transition:'background 0.2s, transform 0.13s'}}>Guardar Perfil</button>}
          {profileLoaded && !editMode && <button type="button" id="editProfileBtn" onClick={handleEdit} style={{margin:'8px 0 0 0',background:'linear-gradient(90deg, #ff6b6b 65%, #4cd964 100%)',color:'#fff',border:'none',padding:'13px 0',width:'100%',borderRadius:'9px',fontSize:'17px',fontWeight:'bold',cursor:'pointer',marginTop:'12px',boxShadow:'0 2px 8px #ff6b6b22',transition:'background 0.2s, transform 0.13s'}}>Editar</button>}
          {success && <div className="success" style={{color:'#4cd964',textAlign:'center',marginTop:'10px'}}>{success}</div>}
          {error && <div className="error" style={{color:'#ff6b6b',textAlign:'center',marginTop:'10px'}}>{error}</div>}
        </form>
      </div>
    </div>
  );
}

export default PetForm;
