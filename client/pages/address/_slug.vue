<template>
	<div>
		<b-row class="mb-2">
			<b-col>
				<h2>Transaction History</h2>
				<p class="lead">Address: {{ hash }}</p>
			</b-col>
		</b-row>
		<b-row class="mb-4">
			<b-col>
				<b-list-group>
					<b-list-group-item>
						Balance:
						<span-loading class="pull-right" v-bind:text="address ? toEther(address.balance) : null"></span-loading>
					</b-list-group-item>
					<b-list-group-item>
						Transaction Count:
						<span-loading class="pull-right" v-bind:text="address ? address.transactionCount : null"></span-loading>
					</b-list-group-item>
					<b-list-group-item>
						Code:
						<code class="address__tag pull-right text-right"><span-loading v-bind:text="address ? address.code : null"></span-loading></code>
					</b-list-group-item>
				</b-list-group>
			</b-col>
			<b-col></b-col>
		</b-row>

		<b-row>
			<b-col>
				<b-card no-body>
					<b-tabs card>
						<b-tab title="Transactions">
							<tx-table :address="hash"></tx-table>
						</b-tab>
					</b-tabs>
				</b-card>
			</b-col>
		</b-row>
	</div>
</template>
<script>
  import async from 'async'
  import mixin from '~/plugins/mixin'
  import TxTable from '~/components/TxTable'
  import SpanLoading from '~/components/SpanLoading'

  export default {
    mixins: [mixin],
    components: {
      TxTable,
	    SpanLoading
    },
    head () {
      return {
        title: 'Address ' + this.hash,
      }
    },
    data: () => ({
      hash: null,
      address: null,
    }),
	  created() {
      let hash = this.$route.params.slug
      if (hash) {
        this.hash = hash
      }
	  },
    mounted () {
      let self = this

      // Init breadcrumbs data.
      this.$store.commit('breadcrumb/setItems', {name: 'address-slug', to: {name: 'address-slug', params: {slug: self.hash}}})

      self.getAccountFromApi()
    },
    methods: {
      async getAccountFromApi () {
        let self = this

        let {data} = await this.$axios.get('/api/accounts/' + self.hash)
        self.address = data
      },
    },
  }
</script>