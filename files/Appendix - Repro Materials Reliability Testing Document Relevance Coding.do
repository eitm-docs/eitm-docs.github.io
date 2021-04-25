**** EXPERT-INFORMED TOPIC MODELS FOR DOCUMENT SET DISCOVERY ****
**** Analytical Code for Human Coding of Thematic Document Relevance ****

* Author: Eike Mark Rinke (University of Leeds, E.M.Rinke@leeds.ac.uk)
* This Version: 4 December 2019

/*
Note 1: Make sure to install the user-written package -kappaetc- before running code.

Note 2: Make sure to change working directory (using -cd- cmd) to folder containing
data before running code.

Note 3: Input xlsx file is based on coding file manually
preformatted for analysis in Stata.
	
Note 4: Dataset contains information about reliabillity test codings for all coders  involved in the final document selection process (coding of thematic relevance) for documents from political blogs in Australia, Switzerland, and Turkey (in online tool for human coding) for whom reliability testing data is available (11 of 13 coders, responsible for 92% of final human codings)
*/

version 16
set more off
capture log close
log using "Appendix - Repro Materials Reliability Testing Document Relevance Coding", replace

* Change to work directory to folder containing raw data
* cd [my data directory]

* Import raw data from xlsx file
import excel "Appendix - Repro Materials Reliability Testing Document Relevance Coding.xlsx", ///
sheet("RelTestData") cellrange(A1:M151) firstrow allstring

* Drop variable containing full text of coded documents
drop Content

* Order variables containing codings by coder number
order C*, seq
order Title, first

* Transform all codings to numerical format
destring C*, replace

* Overall reliability
kappaetc C*, wgt(identity) se(conditional) level(95) benchmark(probabilistic) showscale

clear all

log close
exit
