export const code = (columnFilter) => {
    return `
<script>
    import { data } from './data.example.js'  
    import { Datatable, rows } from 'svelte-simple-datatables'
    const settings = { columnFilter: ${columnFilter} }
</script>

<Datatable {settings} {data}>
    <thead>
        <th data-key="id">ID</th>
        <th data-key="first_name">First Name</th>
        <th data-key="last_name">Last Name</th>
        <th data-key="email">Email</th>
    </thead>
    <tbody>
        {#each $rows as row}
        <tr>
            <td>{row.id}</td>
            <td>{row.first_name}</td>
            <td>{row.last_name}</td>
            <td>{row.email}</td>
        </tr>
        {/each}
    </tbody>
</Datatable>

<style>
    th:first-child{width:72px;}
    td{text-align:center;padding:4px 0} 
</style>


`
}