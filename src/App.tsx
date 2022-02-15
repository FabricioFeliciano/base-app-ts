import React, { useEffect, useState } from 'react';
import './assets/style/default.scss';

import data from './data/words.json';

interface Word {
  word: string,
  clean: string
}

function App() {

  const [words, setWords] = useState<Word[]>(data);

  const [posicoes, setPosicoes] = useState(["", "", "", "", ""]);
  const [posicoesErro, setPosicoesErro] = useState(["", "", "", "", ""]);
  const [incluir, setIncluir] = useState('');
  const [excluir, setExcluir] = useState('');

  useEffect(() => {

    var _words = data;

    //Excluir
    if (excluir.length > 0) {

      Array.from(excluir).forEach(
        x => {
          _words = _words.filter(w => !w.clean.includes(x));
        })
    }

    //Incluir
    if (incluir.length > 0) {
      Array.from(incluir).forEach(
        i => {
          _words = _words.filter(w => w.clean.includes(i));
        })
    }

    //posicções
    if (Array.from(posicoes).some(p => p.length === 1)) {

      _words = _words.filter(d => {

        let size = 0;
        let macths = 0;
        Array.from(d.clean).forEach((l, i) => {

          if (posicoes[i].length === 1) {
            size++;
            if (l === posicoes[i]) {
              macths++;
            }
          }
        });
        return size === macths;
      });
    }

    //Posicções erro
    if (Array.from(posicoesErro).some(p => p.length === 1)) {

      _words = _words.filter(d => {
        let match = true;
        Array.from(d.clean).forEach((l, i) => {
          if (posicoesErro[i].length === 1) {
            if (l === posicoesErro[i]) {
              match = false;
            }
          }
        });
        return match;
      });
    }

    setWords(_words);

  }, [posicoes, posicoesErro, incluir, excluir])


  const limpar = () => {
    setPosicoes(["", "", "", "", ""]);
    setPosicoesErro(["", "", "", "", ""]);
    setIncluir('');
    setExcluir('');
  }




  return (
    <div className="App">
      <header className="App-header">
        <h1>Localizar Palavra <button onClick={limpar}>Limpar</button></h1>
        <h3>Posições</h3>
        <div>
          <input maxLength={1} style={{ width: '50px' }} type="text" value={posicoes[0]} onChange={event => setPosicoes(posicoes.map((p, i) => p = i === 0 ? event.target.value : p))} />
          <input maxLength={1} style={{ width: '50px' }} type="text" value={posicoes[1]} onChange={event => setPosicoes(posicoes.map((p, i) => p = i === 1 ? event.target.value : p))} />
          <input maxLength={1} style={{ width: '50px' }} type="text" value={posicoes[2]} onChange={event => setPosicoes(posicoes.map((p, i) => p = i === 2 ? event.target.value : p))} />
          <input maxLength={1} style={{ width: '50px' }} type="text" value={posicoes[3]} onChange={event => setPosicoes(posicoes.map((p, i) => p = i === 3 ? event.target.value : p))} />
          <input maxLength={1} style={{ width: '50px' }} type="text" value={posicoes[4]} onChange={event => setPosicoes(posicoes.map((p, i) => p = i === 4 ? event.target.value : p))} />
        </div>
        <h3>Posições Erro</h3>
        <div>
          <input maxLength={1} style={{ width: '50px' }} type="text" value={posicoesErro[0]} onChange={event => setPosicoesErro(posicoesErro.map((p, i) => p = i === 0 ? event.target.value : p))} />
          <input maxLength={1} style={{ width: '50px' }} type="text" value={posicoesErro[1]} onChange={event => setPosicoesErro(posicoesErro.map((p, i) => p = i === 1 ? event.target.value : p))} />
          <input maxLength={1} style={{ width: '50px' }} type="text" value={posicoesErro[2]} onChange={event => setPosicoesErro(posicoesErro.map((p, i) => p = i === 2 ? event.target.value : p))} />
          <input maxLength={1} style={{ width: '50px' }} type="text" value={posicoesErro[3]} onChange={event => setPosicoesErro(posicoesErro.map((p, i) => p = i === 3 ? event.target.value : p))} />
          <input maxLength={1} style={{ width: '50px' }} type="text" value={posicoesErro[4]} onChange={event => setPosicoesErro(posicoesErro.map((p, i) => p = i === 4 ? event.target.value : p))} />
        </div>
        <h3>Tem as letras</h3>
        <div>
          <input type="text" value={incluir} onChange={event => setIncluir(event.target.value)} />
        </div>
        <h3>Não tem as letras</h3>
        <div>
          <input type="text" value={excluir} onChange={event => setExcluir(event.target.value)} />
        </div>
        <div>
          <h2>Words</h2>
          <p>
            {
              words.map((w, i) => {
                return <span>{w.word} • </span>
              })
            }
          </p>
        </div>
      </header>
    </div>
  );
}

export default App;
