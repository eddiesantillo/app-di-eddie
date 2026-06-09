// Modifica la struttura dei dati nell'admin
const [formData, setFormData] = useState({ 
  titoloGenerale: '', 
  sezioni: [{ titolo: 'Introduzione', testo: '' }] 
});

// Aggiungi una funzione per aggiungere nuove sezioni
const aggiungiSezione = () => {
  setFormData({ ...formData, sezioni: [...formData.sezioni, { titolo: '', testo: '' }] });
};

// ... nel JSX dell'Admin ...
{formData.sezioni.map((s, index) => (
  <div key={index} style={{ marginBottom: '20px', border: '1px solid #333', padding: '10px' }}>
    <input 
      value={s.titolo} 
      onChange={(e) => {
        const newSezioni = [...formData.sezioni];
        newSezioni[index].titolo = e.target.value;
        setFormData({ ...formData, sezioni: newSezioni });
      }}
      placeholder="Titolo Capitolo"
      style={{ width: '100%', marginBottom: '5px' }}
    />
    <textarea 
      value={s.testo} 
      onChange={(e) => {
        const newSezioni = [...formData.sezioni];
        newSezioni[index].testo = e.target.value;
        setFormData({ ...formData, sezioni: newSezioni });
      }}
      placeholder="Testo del capitolo"
      style={{ width: '100%', height: '100px' }}
    />
  </div>
))}
<button onClick={aggiungiSezione}>+ Aggiungi Capitolo</button>