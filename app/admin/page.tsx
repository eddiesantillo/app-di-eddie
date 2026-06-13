{view === 'calendario' && (
  <div>
    {(data.calendario || []).map((c: any, i: number) => (
      <div key={i} style={{marginBottom: '20px', border: '1px solid #555', padding: '15px', background: '#222', borderRadius: '8px', pointerEvents: 'auto'}}>
        <input 
          value={c.title || ''} 
          onChange={(e) => { const n = [...data.calendario]; n[i].title = e.target.value; setData({...data, calendario: n}); }} 
          style={{...inputStyle, pointerEvents: 'auto'}} 
          placeholder="Nome Concerto" 
        />
        <input 
          type="date" 
          value={c.start || ''} 
          onChange={(e) => { const n = [...data.calendario]; n[i].start = e.target.value; setData({...data, calendario: n}); }} 
          style={{...inputStyle, pointerEvents: 'auto'}} 
        />
        <input 
          value={c.location || ''} 
          onChange={(e) => { const n = [...data.calendario]; n[i].location = e.target.value; setData({...data, calendario: n}); }} 
          style={{...inputStyle, pointerEvents: 'auto'}} 
          placeholder="Luogo" 
        />
        <select 
          value={c.tipo || 'RL'} 
          onChange={(e) => { const n = [...data.calendario]; n[i].tipo = e.target.value; setData({...data, calendario: n}); }} 
          style={{...inputStyle, pointerEvents: 'auto'}}
        >
          <option value="RL">RL</option>
          <option value="SL">SL</option>
        </select>
        <input 
          value={c.link || ''} 
          onChange={(e) => { const n = [...data.calendario]; n[i].link = e.target.value; setData({...data, calendario: n}); }} 
          style={{...inputStyle, pointerEvents: 'auto'}} 
          placeholder="Link" 
        />
        <button 
          onClick={() => setData({...data, calendario: data.calendario.filter((_:any, idx:number) => idx !== i)})} 
          style={{marginTop: '10px', background: '#700', color: '#fff', padding: '8px', cursor: 'pointer', pointerEvents: 'auto'}}
        >
          Elimina
        </button>
      </div>
    ))}
    <button onClick={() => setData({...data, calendario: [...(data.calendario || []), {title: '', start: '', location: '', tipo: 'RL', link: ''}]})}>+ Aggiungi</button>
  </div>
)}