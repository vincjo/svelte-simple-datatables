<script>
    import Demo from 'components/Demo.svelte'
    import { code } from 'code/demo.scroll-y.js'
    import { data } from 'app/data.js'
    import { Menu, Menuitem, Button, Icon, Checkbox } from 'svelte-mui/src'
    import Datatable from '../../../../src/Datatable.svelte'
	import ColumnFilterInput from '../../../../src/ColumnFilterInput.svelte'
    import { rows } from '../../../../src/stores/data.js'
    let scrollY = false
    let checked = true
    let rowPerPage = 10
    $: settings = { 
        rowPerPage: rowPerPage,
        scrollY: scrollY,
        columnFilter: true 
    }
</script>


<div class="menu">
<Menu origin="top right" dy={36} width={180}>
    <div slot="activator">
        <Button color="primary" outlined ripple={false} style="padding:0 8px;">
            <span>Rows per page : <b>{rowPerPage}</b> &nbsp;&#8628;</span>
        </Button>
    </div>

    <Menuitem on:click={() => rowPerPage = 5}>5 rows per page</Menuitem>
    <Menuitem on:click={() => rowPerPage = 10}>10 rows per page</Menuitem>
    <Menuitem on:click={() => rowPerPage = 20}>20 rows per page</Menuitem>
    <Menuitem on:click={() => rowPerPage = 50}>50 rows per page</Menuitem>
    <Menuitem on:click={() => rowPerPage = 100}>100 rows per page</Menuitem>
</Menu>
</div>

<Checkbox bind:checked={checked} on:click={() => scrollY = checked}>Disable vertical scroll</Checkbox>

<p>
    Disabling vertical scroll renders table in a more standard way : no floating header and no fit to container.<br>
    However the column-filter-inputs must be imported as component to activate column filtering.
</p>


<Demo code={code(rowPerPage, scrollY)} {data} {scrollY}>
    {#if !scrollY}
    <Datatable {settings} data={JSON.parse(data)}>
        <thead>
            <tr>
                <th class="sortable asc desc" data-key="id">ID <span/></th>
                <th class="sortable asc desc" data-key="first_name">First Name<span/></th>
                <th class="sortable asc desc" data-key="last_name">Last Name<span/></th>
                <th class="sortable asc desc" data-key="email">Email<span/></th>
            </tr>
            <tr>
                <ColumnFilterInput index={0}/>
                <ColumnFilterInput index={1}/>
                <ColumnFilterInput index={2}/>
                <ColumnFilterInput index={3}/>
            </tr>
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
    {:else}
    <Datatable {settings} data={JSON.parse(data)}>
        <thead class="sticky">
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
    {/if}
</Demo>

<style>
    th:first-child{width:72px;}
    thead:not(.sticky) th {
        padding: 8px 0px 8px 16px;
        text-align: center;
        border-bottom: 1px solid #eee;
        background: #fff;
    }
    th.sortable {
        cursor: pointer;
    }
    th.sortable span {
        padding-right: 16px;
        position: relative;
    }
    th.sortable span:before,
    th.sortable span:after {
        border: 4px solid transparent;
        content: '';
        display: block;
        height: 0;
        right: 0;
        top: 50%;
        position: absolute;
        width: 0;
    }
    th.sortable span:before {
        border-bottom-color: #e0e0e0;
        margin-top: -9px;
    }
    th.sortable span:after {
        border-top-color: #e0e0e0;
        margin-top: 1px;
    }
    th.sortable.asc:not(.desc) span:before {
        border-bottom-color: #9e9e9e;
    }
    th.sortable.desc:not(.asc) span:after {
        border-top-color: #9e9e9e;
    }
    td{text-align:center;padding:4px 0}
    div.menu{margin:24px 0 8px 0}
    p{color:var(--primary, #b71540)}
</style>