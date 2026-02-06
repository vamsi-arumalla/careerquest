using Elastic.Clients.Elasticsearch;
using Elastic.Clients.Elasticsearch.QueryDsl;
using SearchService.Models;

namespace SearchService.Data
{
    public class SearchRepository : ISearchRepository
    {
        private readonly ElasticsearchClient _client;
        private const string IndexName = "jobs";

        public SearchRepository(ElasticsearchClient client)
        {
            _client = client;
        }

        public async Task<bool> IndexJobAsync(Job job)
        {
            var response = await _client.IndexAsync(job, idx => idx.Index(IndexName));
            return response.IsValidResponse;
        }

        public async Task<IEnumerable<Job>> SearchJobsAsync(string query)
        {
            var response = await _client.SearchAsync<Job>(s => s
                .Index(IndexName)
                .Query(q => q
                    .MultiMatch(m => m
                        .Fields(f => f
                            .Field(p => p.Title)
                            .Field(p => p.Description)
                            .Field(p => p.Company)
                        )
                        .Query(query)
                        .Fuzziness(new Fuzziness("AUTO"))
                    )
                )
            );

            if (!response.IsValidResponse)
            {
                return Enumerable.Empty<Job>();
            }

            return response.Documents;
        }
    }
}
