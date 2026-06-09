# 🩺 pgvitals Diagnostic Report — RNAcentral (EBI)

> **This is a real diagnostic run** against the [RNAcentral public database](https://rnacentral.org) hosted by the European Bioinformatics Institute — a 638 GB production PostgreSQL 16 instance, read-only access, open to the public. Sections requiring `pg_stat_statements` or superuser privileges show `⚠️ Error`, which is expected for a public read-only user. All other sections reflect genuine live data.
>
> Run with: `python runner/run_diagnostics.py --profile rnacentral`

---

> **Database**: `pfmegrnargs` on `hh-pgsql-public.ebi.ac.uk:5432`  
> **PostgreSQL Version**: 16.11 on x86_64-pc-linux-gnu  
> **Connected As**: `reader` (public read-only)  
> **Report Generated**: 2026-06-09 17:41 UTC  
> **Sections Executed**: 41

## 📋 Executive Summary

| # | Section | Area | Risk | Status | Findings |
|---|---------|------|------|--------|----------|
| 00 | Prerequisites | Prerequisites | info | ⚠️ Error | Requires elevated privileges (e.g., `pg_monitor` role). |
| 01 | Slow Queries | Query Behavior | high | ⚠️ Error | Requires `pg_stat_statements` extension. Install it via `CRE |
| 02 | Temp Pressure | Query Behavior | medium | ⚠️ Error | Requires `pg_stat_statements` extension. Install it via `CRE |
| 03 | Seq Scan Hotspots | Query Behavior | medium | 📊 Data | 20 rows returned |
| 04 | N Plus One | Query Behavior | medium | ⚠️ Error | Requires `pg_stat_statements` extension. Install it via `CRE |
| 05 | Jit Overhead | Query Behavior | low | ⚠️ Error | Requires `pg_stat_statements` extension. Install it via `CRE |
| 06 | Unused Indexes | Index Health | medium | 📊 Data | 1 rows returned |
| 07 | Duplicate Indexes | Index Health | medium | 📊 Data | 36 rows returned |
| 08 | Invalid Indexes | Index Health | high | ✅ Clear | No issues detected |
| 09 | Missing Fk Indexes | Index Health | medium | 📊 Data | 30 rows returned |
| 10 | Index Bloat | Index Health | medium | ⚠️ Error | psql: error: connection to server at "hh-pgsql-public.ebi.ac |
| 11 | Table Bloat | Tables & Storage | medium | ⚠️ Error | ERROR:  integer out of range |
| 12 | Toast Bloat | Tables & Storage | low | 📊 Data | 5 rows returned |
| 13 | Table Size Ranking | Tables & Storage | info | ⚠️ Error | psql: error: connection to server at "hh-pgsql-public.ebi.ac |
| 14 | Table Access Patterns | Tables & Storage | medium | 📊 Data | 25 rows returned |
| 15 | Autovacuum Activity | Vacuum & Stats | medium | 📊 Data | 1 rows returned |
| 16 | Dead Tuple Urgency | Vacuum & Stats | high | ✅ Clear | No issues detected |
| 17 | Stale Statistics | Vacuum & Stats | medium | ⚠️ Error | psql: error: connection to server at "hh-pgsql-public.ebi.ac |
| 18 | Long Running Transactions | Vacuum & Stats | high | ✅ Clear | No issues detected |
| 19 | Connection Saturation | Connections | high | 📊 Data | 3 rows returned |
| 20 | Idle In Transaction | Connections | high | ✅ Clear | No issues detected |
| 21 | Lock Wait Tree | Connections | high | ✅ Clear | No issues detected |
| 22 | Wait Events | Connections | medium | 📊 Data | 1 rows returned |
| 23 | Streaming Replication Lag | Replication | high | ✅ Clear | No issues detected |
| 24 | Logical Replication Lag | Replication | high | ✅ Clear | No issues detected |
| 25 | Replication Slot Wal | Replication | medium | 📊 Data | 1 rows returned |
| 26 | Xid Wraparound | Risk Signals | critical | 📊 Data | 20 rows returned |
| 27 | Mxid Wraparound | Risk Signals | critical | 📊 Data | 4 rows returned |
| 28 | Sequence Exhaustion | Risk Signals | high | ✅ Clear | No issues detected |
| 29 | Guc Settings | Config & Health | info | 📊 Data | 34 rows returned |
| 30 | Buffer Cache Hit | Config & Health | medium | 📊 Data | 1 rows returned |
| 31 | Checkpoint Pressure | Config & Health | medium | 📊 Data | 1 rows returned |
| 32 | Database Summary | Config & Health | info | ⚠️ Error | Requires elevated privileges (e.g., `pg_monitor` role). |
| 33 | Wal Generation | Config & Health | medium | 📊 Data | 1 rows returned |
| 34 | Partitioned Table Health | Tables & Storage | low | ⚠️ Error | Requires elevated privileges (e.g., `pg_monitor` role). |
| 35 | Prepared Transactions | Risk Signals | high | ✅ Clear | No issues detected |
| 36 | Pg Stat Io | Config & Health | medium | 📊 Data | 9 rows returned |
| 37 | Extension Inventory | — | — | ⚠️ Error | Requires elevated privileges (e.g., `pg_monitor` role). |
| 38 | Foreign Data Wrappers | — | — | ⚠️ Error | Requires elevated privileges (e.g., `pg_monitor` role). |
| 39 | Function Performance | — | — | ✅ Clear | No issues detected |
| 40 | Schema Size Breakdown | — | — | 📊 Data | 2 rows returned |

## 🏥 Health Score Overview

| Metric | Count | Percentage |
|--------|-------|------------|
| ✅ Clear (No Issues) | 10 | 24% |
| 📊 Data (Findings)   | 18  | 44% |
| ⚠️ Error (Unavailable) | 13 | 32% |

### Breakdown by Area

| Area | ✅ Clear | 📊 Data | ⚠️ Error |
|------|----------|---------|----------|
| Prerequisites | 0 | 0 | 1 |
| Query Behavior | 0 | 1 | 4 |
| Index Health | 1 | 3 | 1 |
| Tables & Storage | 0 | 2 | 3 |
| Vacuum & Stats | 2 | 1 | 1 |
| Connections | 2 | 2 | 0 |
| Replication | 2 | 1 | 0 |
| Risk Signals | 2 | 2 | 0 |
| Config & Health | 0 | 5 | 1 |
| Other | 1 | 1 | 2 |

---

## 🔍 Detailed Section Results

### Section 00 — Prerequisites

**What**: Confirm your database environment is ready for pgvitals  
**Look for**: has_pg_monitor = true and pg_stat_statements installed  
**Action**: Install pg_stat_statements; grant pg_monitor role to your user  
**Requires**: pg_stat_statements in shared_preload_libraries  

**Status**: ⚠️ Error  
**Risk Level**: ℹ️ INFO

<details>
<summary>⚠️ Error Details</summary>

```
ERROR:  permission denied for table pg_extension
```
</details>

> [!NOTE]
> Requires elevated privileges (e.g., `pg_monitor` role).

---

### Section 01 — Slow Queries

**What**: Top queries ranked by total CPU time consumed  
**Look for**: mean_exec_ms > 100ms | pct_total_time > 10%  
**Action**: EXPLAIN ANALYZE the top offenders; add indexes or  
**Requires**: pg_stat_statements  

**Status**: ⚠️ Error  
**Risk Level**: 🟠 HIGH

<details>
<summary>⚠️ Error Details</summary>

```
ERROR:  relation "pg_stat_statements" does not exist
LINE 14: FROM pg_stat_statements
              ^
```
</details>

> [!NOTE]
> Requires `pg_stat_statements` extension. Install it via `CREATE EXTENSION pg_stat_statements;`.

---

### Section 02 — Temp Pressure

**What**: Queries spilling intermediate results to disk  
**Look for**: Any temp_written_mb > 0 — every MB is a disk write  
**Action**: Increase work_mem for the session or tune join/sort  
**Requires**: pg_stat_statements  

**Status**: ⚠️ Error  
**Risk Level**: 🟡 MEDIUM

<details>
<summary>⚠️ Error Details</summary>

```
ERROR:  relation "pg_stat_statements" does not exist
LINE 9: FROM pg_stat_statements
             ^
```
</details>

> [!NOTE]
> Requires `pg_stat_statements` extension. Install it via `CREATE EXTENSION pg_stat_statements;`.

---

### Section 03 — Seq Scan Hotspots

**What**: Tables hit mostly with full sequential scans  
**Look for**: seq_scan_pct > 50% on tables with n_live_tup > 10k  
**Action**: Add a targeted index on the filtered columns;  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
schemaname |      tablename       | seq_scan | seq_tup_read |  idx_scan   | seq_scan_pct | n_live_tup | total_size 
------------+----------------------+----------+--------------+-------------+--------------+------------+------------
 rnacen     | xref                 |   103338 |     15795856 | 53418849463 |         0.00 |      20220 | 8312 kB
 rnacen     | rnc_interactions     |    11462 |    268733820 |          11 |        99.90 |      23827 | 5256 kB
 rnacen     | rnc_sequence_regions |     9226 | 255134401444 |     4981793 |         0.18 |   63014059 | 21 GB
 rnacen     | ensembl_compara      |     9194 |   2541174072 |        9359 |        49.56 |     308508 | 36 MB
 rnacen     | rfam_model_hits      |     7799 | 147669668222 |         753 |        91.20 |   42615005 | 9977 MB
 rnacen     | cpat_results         |     7181 |   1485903381 |       69102 |         9.41 |    1005172 | 120 MB
 rnacen     | xref_p17_not_deleted |     6023 |  30729008260 | 53391678340 |         0.00 |   10779149 | 3503 MB
 rnacen     | rnc_rna_precomputed  |     6007 | 179540121384 |    25188274 |         0.02 |  108558601 | 35 GB
 rnacen     | xref_p26_deleted     |     5952 |    574645065 |      353069 |         1.66 |     194925 | 56 MB
 rnacen     | xref_p25_not_deleted |     5940 |   5461113951 | 49164892951 |         0.00 |    1953212 | 619 MB
 rnacen     | xref_p55_not_deleted |     5805 |   1507530945 | 38292166675 |         0.00 |     571136 | 179 MB
 rnacen     | xref_p6_deleted      |     5657 |   1176846058 |      353902 |         1.57 |     442034 | 127 MB
 rnacen     | xref_p8_deleted      |     5655 |    971607186 |      353900 |         1.57 |     365202 | 111 MB
 rnacen     | xref_p6_not_deleted  |     5503 |   1141379289 | 38292166916 |         0.00 |     422053 | 128 MB
 rnacen     | xref_p52_deleted     |     5332 |    779888900 |      353472 |         1.49 |     311273 | 97 MB
 rnacen     | rnc_locus_members    |     5143 |   2210470911 |        1409 |        78.50 |    1059299 | 124 MB
 rnacen     | rnc_locus            |     5138 |   4107344187 |      188351 |         2.66 |    1622200 | 594 MB
 rnacen     | xref_p9_not_deleted  |     4127 |    438801088 | 38238578294 |         0.00 |     131191 | 45 MB
 rnacen     | xref_p24_deleted     |     4043 |    115437325 |      352831 |         1.13 |      33690 | 10 MB
 rnacen     | xref_p21_deleted     |     4031 |    217210025 |      352656 |         1.13 |      63965 | 28 MB
(20 rows)
```

---

### Section 04 — N Plus One

**What**: Queries called thousands of times, cheap individually  
**Look for**: calls > 10000 and mean_exec_ms < 10  
**Action**: Batch with IN clause; add caching; review ORM eager  
**Requires**: pg_stat_statements  

**Status**: ⚠️ Error  
**Risk Level**: 🟡 MEDIUM

<details>
<summary>⚠️ Error Details</summary>

```
ERROR:  relation "pg_stat_statements" does not exist
LINE 7: FROM pg_stat_statements
             ^
```
</details>

> [!NOTE]
> Requires `pg_stat_statements` extension. Install it via `CREATE EXTENSION pg_stat_statements;`.

---

### Section 05 — Jit Overhead

**What**: Queries where JIT compilation cost exceeds its benefit  
**Look for**: total_jit_ms close to or greater than mean_exec_ms  
**Action**: SET jit = off for the session; raise jit_above_cost  
**Requires**: pg_stat_statements, PostgreSQL 11+  

**Status**: ⚠️ Error  
**Risk Level**: 🟢 LOW

<details>
<summary>⚠️ Error Details</summary>

```
ERROR:  relation "pg_stat_statements" does not exist
LINE 12: FROM pg_stat_statements
              ^
```
</details>

> [!NOTE]
> Requires `pg_stat_statements` extension. Install it via `CREATE EXTENSION pg_stat_statements;`.

---

### Section 06 — Unused Indexes

**What**: Indexes that have never been used in a query scan  
**Look for**: idx_scan = 0 on non-primary, non-unique indexes  
**Action**: DROP after verifying stats haven't been reset  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
stats_reset 
-------------
 
(1 row)
```

---

### Section 07 — Duplicate Indexes

**What**: Multiple indexes covering the exact same column set  
**Look for**: Any row — duplicates add write overhead with no  
**Action**: Keep the most specific one; DROP the rest  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
table_name                  |                                                          duplicate_indexes                                                          |             sizes             | index_columns 
---------------------------------------------+-------------------------------------------------------------------------------------------------------------------------------------+-------------------------------+---------------
 auth_permission                             | {auth_permission_37ef4eb4,auth_permission_417f1b1c}                                                                                 | {"16 kB","16 kB"}             | 3
 ensembl_assembly                            | {ensembl_assembly_assembly_id_445613b5d4415e25_like,ensembl_assembly_pkey}                                                          | {"48 kB","48 kB"}             | 1
 ensembl_assembly                            | {ensembl_assembly_assembly_full_name_4e04e34c934d828c_like,ensembl_assembly_fce94082}                                               | {"48 kB","48 kB"}             | 2
 ensembl_assembly                            | {ensembl_assembly_f18d9711,ensembl_assembly_gca_accession_6453f4761e62fac1_like}                                                    | {"48 kB","48 kB"}             | 3
 ensembl_assembly                            | {ensembl_assembly_assembly_ucsc_18c1678ec4499598_like,ensembl_assembly_d3a9bcdf}                                                    | {"16 kB","16 kB"}             | 4
 ensembl_assembly                            | {ensembl_assembly_common_name_2fb95f30e1a6510c_like,ensembl_assembly_f0a6a773}                                                      | {"40 kB","40 kB"}             | 5
 ensembl_assembly                            | {ensembl_assembly_subdomain_15320e5d,ensembl_assembly_subdomain_15320e5d_like}                                                      | {"16 kB","16 kB"}             | 13
 r2dt_models                                 | {fk_rnc_secondary_structure_layout_models__model_name,rnc_secondary_structure_layout_models_model_name_key}                         | {"152 kB","152 kB"}           | 2
 r2dt_results                                | {ix_layout__urs,un_layout__urs}                                                                                                     | {"1037 MB","1037 MB"}         | 1
 rfam_analyzed_sequences                     | {rfam_analyzed_sequences_pkey,rfam_analyzed_sequences_upi_143bc1f118b7f227_like}                                                    | {"1013 MB","1013 MB"}         | 1
 rfam_clans                                  | {rfam_clans_pkey,rfam_clans_rfam_clan_id_bb628fbf349ed40_like}                                                                      | {"16 kB","16 kB"}             | 1
 rfam_go_terms                               | {rfam_go_terms_4582906f,rfam_go_terms_rfam_model_id_418d94a91e74ecaa_like}                                                          | {"88 kB","88 kB"}             | 2
 rfam_models                                 | {rfam_models_pkey,rfam_models_rfam_model_id_3cafff1ce352ae9c_like}                                                                  | {"112 kB","112 kB"}           | 1
 rfam_models                                 | {rfam_models_21e3d921,rfam_models_rfam_clan_id_4497ffd203fbfac6_like}                                                               | {"48 kB","48 kB"}             | 11
 rna                                         | {idx_rna_upi,rna_pkey}                                                                                                              | {"1499 MB","1499 MB"}         | 2
 rnacen_django_test.auth_group               | {rnacen_django_test.auth_group_name_253ae2a6331666e8_like,rnacen_django_test.auth_group_name_key}                                   | {"8192 bytes","8192 bytes"}   | 2
 rnacen_django_test.auth_user                | {rnacen_django_test.auth_user_username_51b3b110094b8aae_like,rnacen_django_test.auth_user_username_key}                             | {"8192 bytes","8192 bytes"}   | 5
 rnacen_django_test.django_session           | {rnacen_django_test.django_session_pkey,rnacen_django_test.django_session_session_key_461cfeaa630ca218_like}                        | {"8192 bytes","8192 bytes"}   | 1
 rnacen_django_test.rna                      | {rnacen_django_test.rna_pkey,rnacen_django_test.rna_upi_795a8cbe77c9dcb8_like}                                                      | {"8192 bytes","8192 bytes"}   | 2
 rnacen_django_test.rna                      | {rnacen_django_test.rna_md5_196782cf84313340_like,rnacen_django_test.rna_md5_key}                                                   | {"8192 bytes","8192 bytes"}   | 9
 rnacen_django_test.rnc_accessions           | {rnacen_django_test.rnc_accessions_accession_642af40e4ed8245_like,rnacen_django_test.rnc_accessions_pkey}                           | {"8192 bytes","8192 bytes"}   | 1
 rnacen_django_test.rnc_chemical_components  | {rnacen_django_test.rnc_chemical_components_id_24763769c8f74ba6_like,rnacen_django_test.rnc_chemical_components_pkey}               | {"8192 bytes","8192 bytes"}   | 1
 rnacen_django_test.rnc_coordinates          | {rnacen_django_test.rnc_coordinates_accession_334503b56739bb4_like,rnacen_django_test.rnc_coordinates_b49e619e}                     | {"8192 bytes","8192 bytes"}   | 9
 rnacen_django_test.rnc_database_json_stats  | {rnacen_django_test.rnc_database_json_stats_database_5e8ea30001769c69_like,rnacen_django_test.rnc_database_json_stats_pkey}         | {"8192 bytes","8192 bytes"}   | 1
 rnacen_django_test.rnc_modifications        | {rnacen_django_test.rnc_modifications_98db0b07,rnacen_django_test.rnc_modifications_upi_4f04c10b7f71f05e_like}                      | {"8192 bytes","8192 bytes"}   | 5
 rnacen_django_test.rnc_modifications        | {rnacen_django_test.rnc_modifications_accession_48ca3e187a40fb5c_like,rnacen_django_test.rnc_modifications_b49e619e}                | {"8192 bytes","8192 bytes"}   | 6
 rnacen_django_test.rnc_modifications        | {rnacen_django_test.rnc_modifications_d3e67576,rnacen_django_test.rnc_modifications_modification_id_3ee33bd32c70e5e2_like}          | {"8192 bytes","8192 bytes"}   | 4
 rnacen_django_test.rnc_reference_map        | {rnacen_django_test.rnc_reference_map_accession_3232946de0ee529_like,rnacen_django_test.rnc_reference_map_b49e619e}                 | {"8192 bytes","8192 bytes"}   | 2
 rnacen_django_test.rnc_rna_precomputed      | {rnacen_django_test.rnc_rna_precomputed_98db0b07,rnacen_django_test.rnc_rna_precomputed_upi_55d1acfbb1f2cae9_like}                  | {"8192 bytes","8192 bytes"}   | 4
 rnacen_django_test.rnc_rna_precomputed      | {rnacen_django_test.rnc_rna_precomputed_id_3222f680e1f4da47_like,rnacen_django_test.rnc_rna_precomputed_pkey}                       | {"8192 bytes","8192 bytes"}   | 1
 rnacen_django_test.rnc_rna_precomputed_data | {rnacen_django_test.rnc_rna_precomputed_data_67daf92c,rnacen_django_test.rnc_rna_precomputed_data_description_18244b0765c4833_like} | {"8192 bytes","8192 bytes"}   | 2
 rnacen_django_test.rnc_rna_precomputed_data | {rnacen_django_test.rnc_rna_precomputed_data_upi_49f33f8c1646138d_like,rnacen_django_test.rnc_rna_precomputed_data_upi_key}         | {"8192 bytes","8192 bytes"}   | 7
 rnacen_django_test.xref                     | {rnacen_django_test.xref_98db0b07,rnacen_django_test.xref_upi_6ec8a58eaec823e7_like}                                                | {"8192 bytes","8192 bytes"}   | 12
 rnacen_django_test.xref                     | {rnacen_django_test.xref_ac_7a5746bcdaf889e_like,rnacen_django_test.xref_ac_key}                                                    | {"8192 bytes","8192 bytes"}   | 8
 rnc_reference_map                           | {"\"rnc_reference_map$reference_id\"","\"rnc_references_map$reference_id\""}                                                        | {"3246 MB","3246 MB"}         | 3
 rnc_sequence_regions                        | {idx_rnc_sequence_regions_id,idx_rnc_sequence_regions_not_mapped,rnc_sequence_regions_pkey}                                         | {"1350 MB","91 MB","1350 MB"} | 1
(36 rows)
```

---

### Section 08 — Invalid Indexes

**What**: Indexes left in invalid state — typically from a  
**Look for**: Any row — invalid indexes waste space and are  
**Action**: DROP index_name; then recreate with CONCURRENTLY  

**Status**: ✅ Clear  
**Risk Level**: 🟠 HIGH

```
schemaname | tablename | indexname | wasted_size 
------------+-----------+-----------+-------------
(0 rows)
```

---

### Section 09 — Missing Fk Indexes

**What**: FK columns with no supporting index — causes seq  
**Look for**: Any row — almost always worth indexing  
**Action**: CREATE INDEX ON table(fk_column);  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
table_name           |                        constraint_name                        |        fk_columns        
--------------------------------+---------------------------------------------------------------+--------------------------
 ensembl_pseudogene_regions     | ensembl_pseduogene_regions_assembly_id_fkey                   | assembly_id
 go_term_annotations            | go_term_annotations_evidence_code_fkey                        | evidence_code
 go_term_annotations            | go_term_annotations_ontology_term_id_fkey                     | ontology_term_id
 go_term_publication_map        | go_term_publication_map_reference_id_fkey                     | reference_id
 insdc_so_term_mapping          | insdc_so_term_mapping_so_term_id_fkey                         | so_term_id
 precompute_urs_taxid           | fk_precompute_urs_taxid__urs_id                               | precompute_urs_id
 r2dt_model_extra_data          | r2dt_model_extra_data_model_id_fkey                           | model_id
 r2dt_models                    | rnc_secondary_structure_layout_models_so_term_id_fkey         | so_term_id
 rfam_go_terms                  | rfam_go_terms_ontology_term_id_fkey                           | ontology_term_id
 rfam_model_hits                | rfam_model_hits_rnc_sequence_features_id_fkey                 | rnc_sequence_features_id
 rfam_models                    | rfam_models_so_rna_type_fkey                                  | so_rna_type
 rnc_accession_sequence_feature | rnc_accessions_sequence_features_rnc_sequence_feature_id_fkey | rnc_sequence_feature_id
 rnc_accessions                 | rnc_accessions_rna_type_fkey                                  | rna_type
 rnc_database_references        | rnc_database_references_reference_id_fkey                     | reference_id
 rnc_feedback_overlap           | rnc_feedback_overlap_assembly_id_fkey                         | assembly_id
 rnc_feedback_target_assemblies | fk_rnc_feedback_target_assemblies__assembly_id                | assembly_id
 rnc_feedback_target_assemblies | fk_rnc_feedback_target_assemblies__dbid                       | dbid
 rnc_gene_status                | rnc_gene_status_assembly_id_fkey                              | assembly_id
 rnc_import_tracker             | rnc_import_tracker_db_id_fkey                                 | db_id
 rnc_interactions               | rnc_interactions_urs_taxid_fkey                               | urs_taxid
 rnc_locus_members              | rnc_locus_members_locus_id_fkey                               | locus_id
 rnc_locus_members              | rnc_locus_members_urs_taxid_fkey                              | urs_taxid
 rnc_rna_precomputed            | rnc_rna_precomputed_last_release_fkey                         | last_release
 rnc_rna_precomputed            | rnc_rna_precomputed_so_rna_type_fkey                          | so_rna_type
 rnc_sequence_features          | feature_provider_fk                                           | feature_provider
 rnc_sequence_features          | fk_rnc_sequence_features__feature_type                        | feature_name
 rnc_sequence_features          | fk_rnc_sequence_features__taxid                               | taxid
 rnc_sequence_features          | rnc_sequence_features_accession_fkey                          | accession
 rnc_taxonomy                   | rnc_taxonomy_replaced_by_fkey                                 | replaced_by
 validate_layout_counts         | validate_layout_counts_name_fkey                              | name
(30 rows)
```

---

### Section 10 — Index Bloat

**What**: Indexes with high fragmentation (free-space waste)  
**Look for**: bloat_pct_estimate > 30% on large indexes  
**Action**: REINDEX CONCURRENTLY indexname  

**Status**: ⚠️ Error  
**Risk Level**: 🟡 MEDIUM

<details>
<summary>⚠️ Error Details</summary>

```
psql: error: connection to server at "hh-pgsql-public.ebi.ac.uk" (193.62.192.243), port 5432 failed: Connection timed out (0x0000274C/10060)
	Is the server running on that host and accepting TCP/IP connections?
```
</details>

> [!NOTE]
> psql: error: connection to server at "hh-pgsql-public.ebi.ac.uk" (193.62.192.243), port 5432 failed: Connection timed ou

---

### Section 11 — Table Bloat

**What**: Tables with large amounts of dead / unreclaimable space  
**Look for**: bloat_pct_estimate > 20% or bloat_size > 100 MB  
**Action**: VACUUM ANALYZE table (online, may need multiple passes)  

**Status**: ⚠️ Error  
**Risk Level**: 🟡 MEDIUM

<details>
<summary>⚠️ Error Details</summary>

```
ERROR:  integer out of range
```
</details>

> [!NOTE]
> ERROR:  integer out of range

---

### Section 12 — Toast Bloat

**What**: Oversized TOAST tables storing large column values  
**Look for**: toast_size >> table_size; toast_to_table_pct > 200%  
**Action**: VACUUM the parent table; consider compressing values  

**Status**: 📊 Data  
**Risk Level**: 🟢 LOW

```
schemaname |        tablename        | table_size | toast_size | toast_to_table_pct 
------------+-------------------------+------------+------------+--------------------
 rnacen     | rna                     | 30 GB      | 2599 MB    |               8.47
 rnacen     | rnc_accessions          | 142 GB     | 130 MB     |               0.09
 rnacen     | rnc_feedback_overlap    | 172 MB     | 91 MB      |              53.17
 rnacen     | rnc_database_json_stats | 64 kB      | 29 MB      |           46112.50
 rnacen     | litsumm_summaries       | 6912 kB    | 13 MB      |             186.23
(5 rows)
```

---

### Section 13 — Table Size Ranking

**What**: Largest objects ranked by total size  
**Look for**: indexes_size >> heap_size (over-indexed tables)  
**Action**: Investigate large objects; review index necessity  

**Status**: ⚠️ Error  
**Risk Level**: ℹ️ INFO

<details>
<summary>⚠️ Error Details</summary>

```
psql: error: connection to server at "hh-pgsql-public.ebi.ac.uk" (193.62.192.243), port 5432 failed: Connection timed out (0x0000274C/10060)
	Is the server running on that host and accepting TCP/IP connections?
```
</details>

> [!NOTE]
> psql: error: connection to server at "hh-pgsql-public.ebi.ac.uk" (193.62.192.243), port 5432 failed: Connection timed ou

---

### Section 14 — Table Access Patterns

**What**: Heap vs index fetch ratio, write load, dead tuple ratio  
**Look for**: High seq_tup_read + low idx_tup_fetch → missing index  
**Action**: Add index for seq scan tables; run VACUUM ANALYZE for high dead_pct  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
schemaname |           tablename            | seq_scan | seq_tup_read |  idx_scan   | idx_tup_fetch | n_tup_ins | n_tup_upd | n_tup_del | n_tup_hot_upd | n_live_tup | n_dead_tup | dead_pct 
------------+--------------------------------+----------+--------------+-------------+---------------+-----------+-----------+-----------+---------------+------------+------------+----------
 rnacen     | xref_not_unique                |     1178 |            0 |             |               |         0 |         0 |         0 |             0 |          0 |          0 |         
 rnacen     | validate_layout_counts         |      694 |   3192086472 |             |               |   6841685 |         0 |         0 |             0 |    6841685 |          0 |     0.00
 rnacen     | rnc_secondary_structure        |      942 |    250256058 |             |               |    328189 |         0 |         0 |             0 |     328189 |          0 |     0.00
 rnacen     | litscan_sentence_id_counts     |     1171 |   1015288684 |             |               |   1984722 |         0 |         0 |             0 |    1984722 |          0 |     0.00
 rnacen     | rnc_feedback_target_assemblies |     1868 |        51713 |             |               |        28 |         0 |         0 |             0 |         28 |          0 |     0.00
 rnacen     | validate_layout_hits           |      532 |      7670269 |             |               |     15895 |         0 |         0 |             0 |      15895 |          0 |     0.00
 rnacen     | r2dt_models_backup             |     2951 |     14843766 |             |               |      5140 |         0 |         0 |             0 |       5140 |          0 |     0.00
 rnacen     | old_summaries                  |     4075 |       199743 |             |               |        50 |         0 |         0 |             0 |         50 |          0 |     0.00
 rnacen     | rnc_sequence_regions           |     9226 | 255134401444 |     4981793 |   12249731675 |  63014048 |         0 |         0 |             0 |   63014059 |          0 |     0.00
 rnacen     | xref_p1_not_deleted            |     2513 | 225350431844 | 53089529551 |   24030935007 | 157391837 |         0 |         0 |             0 |  157413203 |          0 |     0.00
 rnacen     | rnc_rna_precomputed            |     6007 | 179540121384 |    25188274 |     177506380 | 108560348 |         0 |         0 |             0 |  108558601 |          0 |     0.00
 rnacen     | rfam_model_hits                |     7799 | 147669668222 |         753 |   28428470803 |  42615354 |         0 |         0 |             0 |   42615005 |          0 |     0.00
 rnacen     | rnc_sequence_exons             |     2276 | 107481858748 |         761 |   50914644219 |  91850876 |         0 |         0 |             0 |   91847483 |          0 |     0.00
 rnacen     | rnc_accessions                 |     1855 |  75748709098 |    80883885 |      49553707 | 237990042 |         0 |         0 |             0 |  237780297 |          0 |     0.00
 rnacen     | xref_p1_deleted                |     1839 |  46579219420 |      353117 |   12451652162 |  46786221 |         0 |         0 |             0 |   46785933 |          0 |     0.00
 rnacen     | rnc_accession_active           |      824 |  50849759792 |          50 |        420529 | 187105500 |         0 |         0 |             0 |  187096732 |          0 |     0.00
 rnacen     | qa_status                      |     2053 |  42595884892 |         284 |    2568443251 |  57103243 |         0 |         0 |             0 |   57201317 |          0 |     0.00
 rnacen     | xref_p17_not_deleted           |     6023 |  30729008260 | 53391678344 |   14326418327 |  10779446 |         0 |         0 |             0 |   10779149 |          0 |     0.00
 rnacen     | rna                            |     3710 |  41653193442 |    21176777 |    1701041862 |  49829069 |         0 |         0 |             0 |   49811529 |          0 |     0.00
 rnacen     | rnc_sequence_features          |      933 |  26935795461 |      575590 |   11442532634 |  45221827 |         0 |         0 |             0 |   45197602 |          0 |     0.00
 rnacen     | rnc_reference_map              |      278 |  37677525325 |        2328 |         35830 | 485818463 |         0 |         0 |             0 |  485837926 |          0 |     0.00
 rnacen     | protein_info                   |     1798 |  35479680639 |       47915 |     704129254 |  43989335 |         0 |         0 |             0 |   43998187 |          0 |     0.00
 rnacen     | rnc_related_sequences          |      558 |  32350535581 |         208 |     171308268 | 123682256 |         0 |         0 |             0 |  123682426 |          0 |     0.00
 rnacen     | xref_p2_deleted                |     1776 |  20558610219 |      353101 |    5768036274 |  21229838 |         0 |         0 |             0 |   21230414 |          0 |     0.00
 rnacen     | xref_p2_not_deleted            |     2202 |  11576836633 | 48766991164 |   12170019119 |   9383360 |         0 |         0 |             0 |    9383846 |          0 |     0.00
(25 rows)
```

---

### Section 15 — Autovacuum Activity

**What**: Vacuum workers currently running and their progress  
**Look for**: Stuck workers (pct_done not advancing over time)  
**Action**: Check autovacuum_max_workers; investigate I/O contention  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
active_autovacuum_workers 
---------------------------
                         0
(1 row)
```

---

### Section 16 — Dead Tuple Urgency

**What**: Tables accumulating dead tuples faster than vacuum clears  
**Look for**: dead_pct > 10% | last_autovacuum = NULL or days ago  
**Action**: VACUUM ANALYZE tablename;  

**Status**: ✅ Clear  
**Risk Level**: 🟠 HIGH

```
schemaname | tablename | n_dead_tup | n_live_tup | dead_pct | n_mod_since_analyze | last_vacuum | last_autovacuum | last_analyze | last_autoanalyze | table_size 
------------+-----------+------------+------------+----------+---------------------+-------------+-----------------+--------------+------------------+------------
(0 rows)
```

---

### Section 17 — Stale Statistics

**What**: Tables with many row modifications since last ANALYZE  
**Look for**: mod_pct > 10% | time_since_analyze > 1 day on hot tables  
**Action**: ANALYZE tablename;  

**Status**: ⚠️ Error  
**Risk Level**: 🟡 MEDIUM

<details>
<summary>⚠️ Error Details</summary>

```
psql: error: connection to server at "hh-pgsql-public.ebi.ac.uk" (193.62.192.243), port 5432 failed: Connection timed out (0x0000274C/10060)
	Is the server running on that host and accepting TCP/IP connections?
```
</details>

> [!NOTE]
> psql: error: connection to server at "hh-pgsql-public.ebi.ac.uk" (193.62.192.243), port 5432 failed: Connection timed ou

---

### Section 18 — Long Running Transactions

**What**: Open transactions blocking autovacuum and holding locks  
**Look for**: xact_duration > 5 minutes  
**Action**: SELECT pg_terminate_backend(pid) after investigation;  

**Status**: ✅ Clear  
**Risk Level**: 🟠 HIGH

```
pid | usename | application_name | client_addr | state | wait_event_type | wait_event | xact_duration | query_duration | current_query 
-----+---------+------------------+-------------+-------+-----------------+------------+---------------+----------------+---------------
(0 rows)
```

---

### Section 19 — Connection Saturation

**What**: Current connections vs max_connections headroom  
**Look for**: used_pct > 80% — approaching the connection limit  
**Action**: Add PgBouncer or another connection pooler;  

**Status**: 📊 Data  
**Risk Level**: 🟠 HIGH

```
application_name    | state | connections 
------------------------+-------+-------------
                        | idle  |          81
 PostgreSQL JDBC Driver | idle  |          43
                        |       |           6
(3 rows)
```

---

### Section 20 — Idle In Transaction

**What**: Sessions sitting idle inside an open transaction  
**Look for**: idle_duration > 30 seconds  
**Action**: Fix application to commit/rollback promptly;  

**Status**: ✅ Clear  
**Risk Level**: 🟠 HIGH

```
pid | usename | application_name | client_addr | idle_duration | txn_open_duration | last_query 
-----+---------+------------------+-------------+---------------+-------------------+------------
(0 rows)
```

---

### Section 21 — Lock Wait Tree

**What**: Full chain of who is blocking whom  
**Look for**: Any row — every lock wait degrades throughput  
**Action**: Find root blocker (the one where blocking_pids = '{}')  

**Status**: ✅ Clear  
**Risk Level**: 🟠 HIGH

```
pid | locktype | locked_object | mode | granted | usename | state | query 
-----+----------+---------------+------+---------+---------+-------+-------
(0 rows)
```

---

### Section 22 — Wait Events

**What**: What all active sessions are currently waiting on  
**Look for**: Lock waits > a few sessions (contention)  
**Action**: Cross-reference with lock tree; investigate I/O if DataFileRead dominates  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
wait_event_type | wait_event | sessions |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   pids                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
-----------------+------------+----------+-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Client          | ClientRead |      125 | {2280504,2280506,2280507,2281593,2385990,2433655,2443017,2443323,2443355,2443414,2443425,2443440,2443441,2443447,2443452,2443474,2443478,2444467,2444726,2444936,2445063,2445296,2445698,2446245,2446346,2446465,2446468,2446979,2447114,2447144,2447280,2447458,2447482,2447730,2447739,2447849,2447850,2447861,2447872,2447876,2447881,2447921,2448036,2448039,2448042,2448043,2448044,2448065,2448081,2448082,2448087,2448119,2448147,2448149,2448151,2448229,2448232,2448241,2448252,2448253,2448254,2448271,2448287,2448288,2448292,2448295,2448298,2448299,2448300,2448304,2448310,2448311,2448331,2448333,2448334,2448335,2448336,2448338,2448339,2448353,2448371,2448468,2448474,2448475,2448479,2448480,2448482,2448486,2448488,2448489,2448509,2448510,2448511,2448517,2448519,2448520,2448522,2448523,2448524,2448526,2448529,2448530,2448582,2448607,2448614,2448616,2448699,2448704,2448710,2448711,2448713,2448723,2448736,2448738,2448740,2448745,2448749,2448765,2448777,2448792,2448808,2448811,2448812,2448814,2448820}
(1 row)
```

---

### Section 23 — Streaming Replication Lag

**What**: Per-standby write, flush, and replay lag  
**Look for**: replay_lag > 30s | flush_lag > 10s  
**Action**: Check standby I/O; verify network throughput;  

**Status**: ✅ Clear  
**Risk Level**: 🟠 HIGH

```
application_name | client_addr | state | sent_lsn | write_lsn | flush_lsn | replay_lsn | write_lag | flush_lag | replay_lag | sync_state | unsent_wal 
------------------+-------------+-------+----------+-----------+-----------+------------+-----------+-----------+------------+------------+------------
(0 rows)
```

---

### Section 24 — Logical Replication Lag

**What**: WAL accumulating for logical replication consumers  
**Look for**: consumer_lag_size > 500 MB — risk of disk exhaustion  
**Action**: Check consumer health; if consumer is gone,  

**Status**: ✅ Clear  
**Risk Level**: 🟠 HIGH

```
slot_name | plugin | database | active | active_pid | consumer_lag_size | consumer_lag_bytes 
-----------+--------+----------+--------+------------+-------------------+--------------------
(0 rows)
```

---

### Section 25 — Replication Slot Wal

**What**: Total WAL held on disk by ALL slots (streaming + logical)  
**Look for**: wal_retained approaching your pg_wal partition free space  
**Action**: Drop inactive slots; advance or drop lagging slots  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
total_wal_held_by_slots 
-------------------------
 
(1 row)
```

---

### Section 26 — Xid Wraparound

**What**: Distance from XID exhaustion (hard limit: ~2 billion)  
**Look for**: xid_age > 1.5B → emergency VACUUM FREEZE needed  
**Action**: VACUUM FREEZE on oldest tables;  

**Status**: 📊 Data  
**Risk Level**: 🔴 CRITICAL

```
schemaname |      tablename       | xid_age | pct_used | table_size 
------------+----------------------+---------+----------+------------
 rnacen     | rna                  |    2933 |     0.00 | 30 GB
 rnacen     | rnc_reference_map    |    2933 |     0.00 | 36 GB
 rnacen     | xref_p1_not_deleted  |    2933 |     0.00 | 21 GB
 rnacen     | rnc_accessions       |    2933 |     0.00 | 142 GB
 rnacen     | rnc_accession_active |    2933 |     0.00 | 18 GB
 rnacen     | r2dt_results         |    2933 |     0.00 | 20 GB
 rnacen     | rnc_rna_precomputed  |    2931 |     0.00 | 17 GB
 rnacen     | rnc_sequence_regions |    2931 |     0.00 | 10234 MB
 rnacen     | xref_p41_deleted     |    2860 |     0.00 | 112 MB
 rnacen     | xref_p50_not_deleted |    2860 |     0.00 | 117 MB
 rnacen     | xref_p31_not_deleted |    2860 |     0.00 | 18 MB
 rnacen     | xref_p23_not_deleted |    2860 |     0.00 | 1040 kB
 rnacen     | xref_p41_not_deleted |    2860 |     0.00 | 79 MB
 rnacen     | xref_p40_not_deleted |    2860 |     0.00 | 8320 kB
 rnacen     | xref_p47_deleted     |    2860 |     0.00 | 6272 kB
 rnacen     | xref_p34_deleted     |    2860 |     0.00 | 24 MB
 rnacen     | xref_p15_not_deleted |    2860 |     0.00 | 4264 kB
 rnacen     | xref_p47_not_deleted |    2860 |     0.00 | 43 MB
 rnacen     | xref_p15_deleted     |    2860 |     0.00 | 8896 kB
 rnacen     | xref_p11_not_deleted |    2860 |     0.00 | 2304 kB
(20 rows)
```

---

### Section 27 — Mxid Wraparound

**What**: Distance from MultiXact exhaustion — a separate  
**Look for**: mxid_age > 1 billion → tables need VACUUM FREEZE  
**Action**: VACUUM FREEZE tablename; lower autovacuum_multixact_freeze_max_age  

**Status**: 📊 Data  
**Risk Level**: 🔴 CRITICAL

```
datname   | mxid_age | mxid_remaining | pct_used 
-------------+----------+----------------+----------
 template0   |        0 |     2147483647 |     0.00
 pfmegrnargs |        0 |     2147483647 |     0.00
 template1   |        0 |     2147483647 |     0.00
 postgres    |        0 |     2147483647 |     0.00
(4 rows)
```

---

### Section 28 — Sequence Exhaustion

**What**: Sequences approaching their max value (integer overflow)  
**Look for**: pct_used > 80% — plan a migration before hitting 100%  
**Action**: ALTER SEQUENCE seq MAXVALUE new_max;  

**Status**: ✅ Clear  
**Risk Level**: 🟠 HIGH

```
schemaname | sequencename | data_type | last_value | min_value | max_value | increment_by | cycle | pct_used | values_remaining 
------------+--------------+-----------+------------+-----------+-----------+--------------+-------+----------+------------------
(0 rows)
```

---

### Section 29 — Guc Settings

**What**: Critical configuration parameters and their source  
**Look for**: source = 'default' on memory/checkpoint settings  
**Action**: Tune in postgresql.conf; reload with pg_reload_conf()  

**Status**: 📊 Data  
**Risk Level**: ℹ️ INFO

```
name                 |  setting  | unit |       source       |                                        short_desc                                         
-------------------------------------+-----------+------+--------------------+-------------------------------------------------------------------------------------------
 maintenance_work_mem                | 262144    | kB   | configuration file | Sets the maximum memory to be used for maintenance operations.
 shared_buffers                      | 865758    | 8kB  | configuration file | Sets the number of shared memory buffers used by the server.
 temp_buffers                        | 1024      | 8kB  | default            | Sets the maximum number of temporary buffers used by each session.
 work_mem                            | 16384     | kB   | configuration file | Sets the maximum memory to be used for query workspaces.
 checkpoint_completion_target        | 0.9       |      | default            | Time spent flushing dirty buffers during checkpoint, as fraction of checkpoint interval.
 checkpoint_timeout                  | 300       | s    | default            | Sets the maximum time between automatic WAL checkpoints.
 max_wal_size                        | 4096      | MB   | configuration file | Sets the WAL size that triggers a checkpoint.
 min_wal_size                        | 256       | MB   | configuration file | Sets the minimum size to shrink the WAL to.
 wal_compression                     | pglz      |      | configuration file | Compresses full-page writes written in WAL file with specified method.
 wal_level                           | replica   |      | configuration file | Sets the level of information written to the WAL.
 autovacuum                          | on        |      | default            | Starts the autovacuum subprocess.
 autovacuum_analyze_scale_factor     | 0.01      |      | configuration file | Number of tuple inserts, updates, or deletes prior to analyze as a fraction of reltuples.
 autovacuum_freeze_max_age           | 200000000 |      | default            | Age at which to autovacuum a table to prevent transaction ID wraparound.
 autovacuum_max_workers              | 3         |      | default            | Sets the maximum number of simultaneously running autovacuum worker processes.
 autovacuum_vacuum_cost_delay        | 2         | ms   | default            | Vacuum cost delay in milliseconds, for autovacuum.
 autovacuum_vacuum_scale_factor      | 0.01      |      | configuration file | Number of tuple updates or deletes prior to vacuum as a fraction of reltuples.
 deadlock_timeout                    | 1000      | ms   | default            | Sets the time to wait on a lock before checking for deadlock.
 idle_in_transaction_session_timeout | 0         | ms   | default            | Sets the maximum allowed idle time between queries, when in a transaction.
 lock_timeout                        | 0         | ms   | default            | Sets the maximum allowed duration of any wait for a lock.
 max_connections                     | 200       |      | configuration file | Sets the maximum number of concurrent connections.
 statement_timeout                   | 0         | ms   | default            | Sets the maximum allowed duration of any statement.
 superuser_reserved_connections      | 3         |      | default            | Sets the number of connection slots reserved for superusers.
 effective_cache_size                | 1328838   | 8kB  | configuration file | Sets the planner's assumption about the total size of the data caches.
 effective_io_concurrency            | 4         |      | configuration file | Number of simultaneous requests that can be handled efficiently by the disk subsystem.
 jit_above_cost                      | 100000    |      | default            | Perform JIT compilation if query is more expensive.
 jit_optimize_above_cost             | 500000    |      | default            | Optimize JIT-compiled functions if query is more expensive.
 log_lock_waits                      | on        |      | configuration file | Logs long lock waits.
 log_min_duration_statement          | -1        | ms   | default            | Sets the minimum execution time above which all statements will be logged.
 log_temp_files                      | 0         | kB   | configuration file | Log the use of temporary files larger than this number of kilobytes.
 max_parallel_workers                | 8         |      | configuration file | Sets the maximum number of parallel workers that can be active at one time.
 max_parallel_workers_per_gather     | 2         |      | configuration file | Sets the maximum number of parallel processes per executor node.
 max_worker_processes                | 8         |      | configuration file | Maximum number of concurrent worker processes.
 random_page_cost                    | 1.5       |      | configuration file | Sets the planner's estimate of the cost of a nonsequentially fetched disk page.
 seq_page_cost                       | 1         |      | default            | Sets the planner's estimate of the cost of a sequentially fetched disk page.
(34 rows)
```

---

### Section 30 — Buffer Cache Hit

**What**: How often reads are served from shared_buffers vs disk  
**Look for**: hit_ratio_pct < 95% on hot tables  
**Action**: Increase shared_buffers; investigate seq scan storms  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
total_hits   | total_reads | global_hit_ratio_pct 
---------------+-------------+----------------------
 6225132619219 | 31255716755 |                99.50
(1 row)
```

---

### Section 31 — Checkpoint Pressure

**What**: Whether checkpoints are forced too frequently and  
**Look for**: forced_pct > 10% → increase max_wal_size  
**Action**: Increase max_wal_size; set checkpoint_completion_target=0.9  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
checkpoints_timed | checkpoints_req | forced_pct | write_time_sec | sync_time_sec | buffers_checkpoint | buffers_clean | maxwritten_clean | buffers_backend | buffers_backend_fsync | buffers_alloc |        stats_age        
-------------------+-----------------+------------+----------------+---------------+--------------------+---------------+------------------+-----------------+-----------------------+---------------+-------------------------
             27653 |             209 |       0.75 |       12339.46 |        128.63 |            4179548 |        282984 |             2623 |       122932511 |                     0 |    4016954096 | 96 days 03:39:02.685501
(1 row)
```

---

### Section 32 — Database Summary

**What**: Per-database throughput, cache hit, deadlocks, temp usage  
**Look for**: rollback_pct > 5% | deadlocks > 0 | cache_hit_pct < 95%  
**Action**: Investigate rollback sources; add deadlock_timeout logging; tune shared_buffers  

**Status**: ⚠️ Error  
**Risk Level**: ℹ️ INFO

<details>
<summary>⚠️ Error Details</summary>

```
ERROR:  permission denied for database postgres
```
</details>

> [!NOTE]
> Requires elevated privileges (e.g., `pg_monitor` role).

---

### Section 33 — Wal Generation

**What**: WAL (Write-Ahead Log) generation volume and rate since stats reset  
**Look for**: High wal_mb_per_hour (e.g. > 1000 MB/hr) indicating write intensity;  
**Action**: Enable wal_compression; tune max_wal_size and checkpoint_timeout;  
**Requires**: PostgreSQL 14+  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
wal_records | wal_fpi  | total_wal_size | total_wal_mb | wal_mb_per_hour | fpi_pct |         stats_reset          
-------------+----------+----------------+--------------+-----------------+---------+------------------------------
   139273956 | 34365140 | 437 GB         |    447538.27 |          193.94 |   24.67 | 2026-03-05 14:02:25.74947+00
(1 row)
```

---

### Section 34 — Partitioned Table Health

**What**: Partitioned tables, partition counts, and total sizes  
**Look for**: partition_count > 100 (high planning overhead);  
**Action**: Merge old partitions or partition by larger range (e.g. monthly);  

**Status**: ⚠️ Error  
**Risk Level**: 🟢 LOW

<details>
<summary>⚠️ Error Details</summary>

```
ERROR:  permission denied for table pg_inherits
```
</details>

> [!NOTE]
> Requires elevated privileges (e.g., `pg_monitor` role).

---

### Section 35 — Prepared Transactions

**What**: Uncommitted prepared transactions (2PC/two-phase commit)  
**Look for**: Any row older than 5 minutes (blocks vacuum, holds locks)  
**Action**: Run COMMIT PREPARED '<gid>'; or ROLLBACK PREPARED '<gid>';  

**Status**: ✅ Clear  
**Risk Level**: 🟠 HIGH

```
gid | prepared | owner | database | age | xid 
-----+----------+-------+----------+-----+-----
(0 rows)
```

---

### Section 36 — Pg Stat Io

**What**: I/O statistics broken down by backend type, target object, and context  
**Look for**: High evictions (shared_buffers size too small); high temp relation  
**Action**: Increase work_mem if temp relation I/O is high; increase shared_buffers  
**Requires**: PostgreSQL 16+, track_io_timing = on (optional for timings)  

**Status**: 📊 Data  
**Risk Level**: 🟡 MEDIUM

```
backend_type     |  object  |  context  |    reads    | read_time_ms |  writes  | write_time_ms |     hits      | evictions  | read_pct 
---------------------+----------+-----------+-------------+--------------+----------+---------------+---------------+------------+----------
 client backend      | relation | bulkread  | 18364621557 |         0.00 | 18734542 |          0.00 |    2875886092 |    6289538 |    86.46
 background worker   | relation | bulkread  |  8829624364 |         0.00 | 26247872 |          0.00 |    1951246904 |    2263517 |    81.90
 client backend      | relation | normal    |  3766015157 |         0.00 |   168405 |          0.00 | 3036236742276 | 3765275274 |     0.12
 background worker   | relation | normal    |   237830057 |         0.00 |    60806 |          0.00 | 3183987359852 |  237766004 |     0.01
 autovacuum worker   | relation | vacuum    |    58450586 |         0.00 | 26380039 |          0.00 |       2455990 |       1237 |    95.97
 client backend      | relation | bulkwrite |           0 |         0.00 | 49270979 |          0.00 |      48691502 |     153809 |     0.00
 autovacuum worker   | relation | normal    |       40668 |         0.00 |       14 |          0.00 |     100865129 |      50879 |     0.04
 startup             | relation | normal    |         139 |         0.00 |        0 |          0.00 |        862765 |          0 |     0.02
 autovacuum launcher | relation | normal    |           3 |         0.00 |        0 |          0.00 |          2403 |          0 |     0.12
(9 rows)
```

---

### Section 37 — Extension Inventory

**What**: All installed extensions with version, schema, and  
**Look for**: installed_version != default_version (upgrade available);  
**Action**: Run ALTER EXTENSION <name> UPDATE; for stale versions;  

**Status**: ⚠️ Error  

<details>
<summary>⚠️ Error Details</summary>

```
ERROR:  permission denied for table pg_extension
```
</details>

> [!NOTE]
> Requires elevated privileges (e.g., `pg_monitor` role).

---

### Section 38 — Foreign Data Wrappers

**What**: FDW servers, user mappings, and foreign tables  
**Look for**: Stale or unconfigured user mappings (broken cross-DB links);  
**Action**: DROP SERVER <name> CASCADE for decommissioned remotes;  

**Status**: ⚠️ Error  

<details>
<summary>⚠️ Error Details</summary>

```
ERROR:  permission denied for table pg_foreign_server
```
</details>

> [!NOTE]
> Requires elevated privileges (e.g., `pg_monitor` role).

---

### Section 39 — Function Performance

**What**: Execution stats for user-defined functions and procedures  
**Look for**: High total_time (top CPU consumers by function);  
**Action**: Profile the body of high-self_time functions;  
**Requires**: track_functions = 'pl' or 'all' in postgresql.conf  

**Status**: ✅ Clear  

```
schemaname | funcname | calls | total_ms | self_ms | mean_ms | self_pct 
------------+----------+-------+----------+---------+---------+----------
(0 rows)
```

---

### Section 40 — Schema Size Breakdown

**What**: Storage consumed per schema — tables, indexes, and TOAST  
**Look for**: Schemas growing unexpectedly (shadow tables, audit logs);  
**Action**: Investigate largest schemas for bloat (run 11, 12);  

**Status**: 📊 Data  

```
schema       | table_count | total_size | table_size | index_size | toast_size | index_pct 
--------------------+-------------+------------+------------+------------+------------+-----------
 rnacen             |         186 | 638 GB     | 373 GB     | 261 GB     | 3007 MB    |      41.0
 rnacen_django_test |          23 | 800 kB     | 32 kB      | 704 kB     | 64 kB      |      88.0
(2 rows)
```

---

## 📊 Recommendations

### 🔴 High Priority Actions

- **Section 19 (Connection Saturation)**: Add PgBouncer or another connection pooler;
- **Section 26 (Xid Wraparound)**: VACUUM FREEZE on oldest tables;
- **Section 27 (Mxid Wraparound)**: VACUUM FREEZE tablename; lower autovacuum_multixact_freeze_max_age

### 🟡 Medium Priority

- **Section 03 (Seq Scan Hotspots)**: Add a targeted index on the filtered columns;
- **Section 06 (Unused Indexes)**: DROP after verifying stats haven't been reset
- **Section 07 (Duplicate Indexes)**: Keep the most specific one; DROP the rest
- **Section 09 (Missing Fk Indexes)**: CREATE INDEX ON table(fk_column);
- **Section 14 (Table Access Patterns)**: Add index for seq scan tables; run VACUUM ANALYZE for high dead_pct
- **Section 15 (Autovacuum Activity)**: Check autovacuum_max_workers; investigate I/O contention
- **Section 22 (Wait Events)**: Cross-reference with lock tree; investigate I/O if DataFileRead dominates
- **Section 25 (Replication Slot Wal)**: Drop inactive slots; advance or drop lagging slots
- **Section 30 (Buffer Cache Hit)**: Increase shared_buffers; investigate seq scan storms
- **Section 31 (Checkpoint Pressure)**: Increase max_wal_size; set checkpoint_completion_target=0.9
- **Section 33 (Wal Generation)**: Enable wal_compression; tune max_wal_size and checkpoint_timeout;
- **Section 36 (Pg Stat Io)**: Increase work_mem if temp relation I/O is high; increase shared_buffers

### ℹ️ Sections Requiring Elevated Access

- Section 00 — Prerequisites
- Section 01 — Slow Queries
- Section 02 — Temp Pressure
- Section 04 — N Plus One
- Section 05 — Jit Overhead
- Section 10 — Index Bloat
- Section 11 — Table Bloat
- Section 13 — Table Size Ranking
- Section 17 — Stale Statistics
- Section 32 — Database Summary
- Section 34 — Partitioned Table Health
- Section 37 — Extension Inventory
- Section 38 — Foreign Data Wrappers

> [!TIP]
> For full coverage, run with a user that has `pg_monitor` role and `pg_stat_statements` installed.
