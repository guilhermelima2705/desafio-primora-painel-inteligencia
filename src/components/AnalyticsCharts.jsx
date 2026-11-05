import { Card } from 'antd';
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const colors = ['#46D7E8', '#64D4B3', '#8CB8FF', '#E7C46C'];
const tooltip = { borderRadius: 12, border: '1px solid #D5E6EB', color: '#133849', background: '#FFFFFF' };
const number = new Intl.NumberFormat('pt-BR');
const tick = { fill: '#597580', fontSize: 11 };

export function EngagementChart({ unidades }) {
  const data = Array.from({ length: Math.max(...unidades.map(u => u.engagementTrend30d.length)) }, (_, i) =>
    Object.fromEntries([['dia', i + 1], ...unidades.map(u => [u.id, u.engagementTrend30d[i]])]));
  return <Card className="analytics-panel dark-panel" title="Engajamento das unidades" extra={<span className="panel-period">30 dias</span>}>
    <p className="panel-description">Eventos por posição na série oficial. Valores absolutos, sem normalização por porte.</p>
    <div className="chart-frame" role="group" aria-label="Evolução dos eventos de engajamento por unidade, série de 30 dias">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}><AreaChart data={data} margin={{ top: 12, right: 12, left: -12, bottom: 0 }} accessibilityLayer>
        <defs>{unidades.map((u,i) => <linearGradient key={u.id} id={`eng-${u.id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={colors[i]} stopOpacity={0.28}/><stop offset="100%" stopColor={colors[i]} stopOpacity={0.01}/></linearGradient>)}</defs>
        <CartesianGrid vertical={false} stroke="#FFFFFF18" />
        <XAxis dataKey="dia" ticks={[1, 10, 20, 30]} tickFormatter={v => `Dia ${v}`} tick={{ ...tick, fill: '#BED3DC' }} axisLine={false} tickLine={false}/>
        <YAxis tick={{ ...tick, fill: '#BED3DC' }} axisLine={false} tickLine={false}/>
        <Tooltip contentStyle={tooltip} labelFormatter={v => `Dia ${v} da série`} formatter={(v,n) => [number.format(v),n]}/><Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }}/>
        {unidades.map((u,i) => <Area key={u.id} type="linear" dataKey={u.id} name={u.nome} stroke={colors[i]} fill={`url(#eng-${u.id})`} strokeWidth={2.5} isAnimationActive={false}/>)}
      </AreaChart></ResponsiveContainer>
    </div>
    <details className="chart-data"><summary>Consultar valores da série</summary><div className="data-scroll" tabIndex={0}><table><caption>Eventos de engajamento — 30 posições da série</caption><thead><tr><th>Dia da série</th>{unidades.map(u => <th key={u.id}>{u.nome}</th>)}</tr></thead><tbody>{data.map(d => <tr key={d.dia}><th>{d.dia}</th>{unidades.map(u => <td key={u.id}>{number.format(d[u.id])}</td>)}</tr>)}</tbody></table></div></details>
  </Card>;
}

export function HealthChart({ unidades }) {
  const labels = { saudavel: 'Saudáveis', atencao: 'Atenção', risco: 'Em risco', critico: 'Críticos' };
  const palette = ['#218B7F', '#459CB5', '#C38B25', '#B85658'];
  const data = unidades.map(u => ({ nome: u.nome.replace('Vetor ', ''), ...u.healthDistribution }));
  return <Card className="analytics-panel" title="Saúde da carteira" extra={<span className="panel-period">Clientes</span>}>
    <p className="panel-description">Distribuição absoluta por unidade e categoria do dataset.</p>
    <div className="chart-frame" role="group" aria-label="Quantidade de clientes por categoria de saúde e unidade">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}><BarChart data={data} margin={{ top: 12, right: 8, left: -20, bottom: 0 }} accessibilityLayer>
        <CartesianGrid vertical={false} stroke="#E3EDF0"/><XAxis dataKey="nome" tick={tick} axisLine={false} tickLine={false} interval={0}/><YAxis tick={tick} axisLine={false} tickLine={false}/>
        <Tooltip contentStyle={tooltip} cursor={{ fill: '#EAF4F6' }}/><Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }}/>
        {Object.entries(labels).map(([key,label],i) => <Bar key={key} dataKey={key} name={label} stackId="saude" fill={palette[i]} maxBarSize={44} isAnimationActive={false}/>)}
      </BarChart></ResponsiveContainer>
    </div>
    <details className="chart-data"><summary>Consultar distribuição</summary><div className="data-scroll" tabIndex={0}><table><caption>Clientes por categoria</caption><thead><tr><th>Unidade</th>{Object.values(labels).map(l => <th key={l}>{l}</th>)}</tr></thead><tbody>{unidades.map(u => <tr key={u.id}><th>{u.nome}</th>{Object.keys(labels).map(k => <td key={k}>{u.healthDistribution[k]}</td>)}</tr>)}</tbody></table></div></details>
  </Card>;
}

export function ClientHealthChart({ series }) {
  return <Card className="analytics-panel client-health" title="Evolução do score de saúde" extra={<span className="panel-period">Série oficial</span>}>
    <div className="chart-frame" role="group" aria-label="Score de saúde do cliente nas datas registradas">
      <ResponsiveContainer width="100%" height="100%" minWidth={0}><LineChart data={series} margin={{ top: 16, right: 16, left: -20, bottom: 0 }} accessibilityLayer>
        <CartesianGrid vertical={false} stroke="#E3EDF0"/><XAxis dataKey="data" tickFormatter={d => d.slice(5).split('-').reverse().join('/')} tick={tick} axisLine={false} tickLine={false} minTickGap={20}/><YAxis domain={[0,100]} tick={tick} axisLine={false} tickLine={false}/>
        <Tooltip contentStyle={tooltip} labelFormatter={d => d.split('-').reverse().join('/')} formatter={v => [v, 'Score de saúde']}/>
        <Line type="linear" dataKey="score" stroke="#127D90" strokeWidth={3} dot={{ r: 4, fill: '#FFFFFF', strokeWidth: 2 }} isAnimationActive={false}/>
      </LineChart></ResponsiveContainer>
    </div>
    <details className="chart-data"><summary>Consultar scores registrados</summary><div className="data-scroll"><table><caption>Score por data</caption><thead><tr><th>Data</th><th>Score</th></tr></thead><tbody>{series.map(s => <tr key={s.data}><th>{s.data.split('-').reverse().join('/')}</th><td>{s.score}</td></tr>)}</tbody></table></div></details>
  </Card>;
}
