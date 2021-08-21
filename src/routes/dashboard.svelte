<script>
	import { axios } from '../service';
	import TH from '../components/th.svelte';
	import TD from '../components/td.svelte';
	$: assignments = [];
	$: selectedAsg = null;
	$: submissions = [];

	function getAssignments() {
		axios
			.get('http://localhost:8080/api/v1/assignments')
			.then((res) => {
				console.log(res);
				assignments = res.data.data;
			})
			.catch((err) => {
				console.log(err);
			});
	}

	getAssignments();
	function setSelectedAsg(val) {
		selectedAsg = val;
		getSubmissionForAsg(val.id);
	}
	function getSubmissionForAsg(asgID = '') {
		axios
			.get(`http://localhost:8080/api/v1/assignments/${asgID}/submissions`)
			.then((res) => {
				submissions = res.data.data;
				console.log(submissions[0]);
			})
			.catch((err) => {
				console.log(err);
			});
	}
</script>

<main class="grid grid-cols-2 gap-8">
	<div class="px-2 py-2">
		<h2 class="text-2xl">Assignments</h2>
		<div class="flex flex-col">
			<div class="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<section class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<TH title="No" />
								<TH title="Pic" />
								<TH title="Name" />
								<TH title="Modified At" />
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								{#each assignments as asg, i}
									<tr on:click={setSelectedAsg(asg)}>
										<TD data={i + 1} />
										<TD data={asg.name[0]}/>
										<TD data={asg.name} />
										<TD data={asg.updatedAt} />
									</tr>
								{/each}
							</tbody>
						</table>
						<ul />
					</section>
				</div>
			</div>
		</div>
	</div>
	{#if selectedAsg}
		<div>
			<div class="pb-4">
				<h2 class="text-2xl">
					Assignment {selectedAsg.name}
				</h2>

				<p>{selectedAsg.description}</p>
			</div>

			<h3 class="text-xl">Latest Submissions</h3>

			<div class="flex flex-col">
				<div class="my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
						<section class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
							<table class="table">
								<thead class="bg-gray-50">
									<TH title="Corrects" />
									<TH title="Incorrects" />
									<TH title="Score" />
									<TH title="SubmittedAt" />
								</thead>
								<tbody>
									{#each submissions as subm}
										<tr>
											<TD data={''} />
											<TD data={''} />
											<TD data={subm.grade} />
											<TD data={subm.updatedAt} />
										</tr>
									{/each}
								</tbody>
							</table>
						</section>
					</div>
				</div>
			</div>
		</div>
	{/if}
</main>
