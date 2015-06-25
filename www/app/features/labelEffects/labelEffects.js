'use strict';

/**
 * @ngdoc function
 * @name gapFront.controller:ChartCtrl
 * @description
 * # ChartCtrl
 * Controller of the gapFront
 */
angular.module('gapFront')
  .controller('LabelEffectsCtrl', function ($scope, IntegrationService, APIService, DrugService) {

    $scope.effects = [];
    $scope.selectedSymptom = '';
    $scope.adverseEffects = [];
    $scope.displayedStuff = [];
    $scope.count = 0;
    $scope.total = 0;

    var initLabelEffects = function(params){
      $scope.selectedDrug = DrugService.getSelectedDrug();
      var query = 'patient.drug.medicinalproduct:'+$scope.selectedDrug.brand_name;
      APIService.aggregateDrugEvent(query, 50, 'patient.reaction.reactionmeddrapt.exact').then(addFdaList,serviceError)
    };

    IntegrationService.registerIntegrationMethod('initLabelEffects', initLabelEffects);

    $scope.fetchDrugEffects = function(){
      APIService.getDrugEffectApi().get($scope.selectedDrug.brand_name).then(updateList,serviceError)
    };

    function addFdaList(resp){
      var res = resp.results;
      for(var i in res){
        $scope.effects.push(res[i].term);
      }
      $scope.fetchDrugEffects();
    }

    function updateList(resp){
      var res = resp.effects;
      for(var i in res){
        $scope.adverseEffects.push({medical_term: res[i].medical_term, layman_term: res[i].layman_term});
      }
      $scope.total = $scope.adverseEffects.length;
      addDisplayedStuff();
    }

    function addDisplayedStuff(){
      var k = genRandomInt(0,$scope.adverseEffects.length);
      var effect = $scope.adverseEffects.splice(k,1)[0];
      var sentence = findMatchingSentence($scope.selectedDrug.object, effect.medical_term);
      $scope.count += 1;
      $scope.displayedStuff.push({effect: effect, sentence:  sentence});
    }

    function genRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function serviceError(error){
    }

    function findMatchingSentence(drugObject, effect) {
      var textToSearch = [];
      console.log(drugObject);

      if (drugObject['boxed_warnings']) {
        textToSearch.push.apply(textToSearch, drugObject['boxed_warnings']);
      }

      if (drugObject['warnings_and_precautions']) {
        textToSearch.push.apply(textToSearch, drugObject['warnings_and_precautions']);
      }

      if (drugObject['user_safety_warnings']) {
        textToSearch.push.apply(textToSearch, drugObject['user_safety_warnings']);
      }

      if (drugObject['precautions']) {
        textToSearch.push.apply(textToSearch, drugObject['precautions']);
      }

      if (drugObject['warnings']) {
        textToSearch.push.apply(textToSearch, drugObject['warnings']);
      }

      if (drugObject['general_precautions']) {
        textToSearch.push.apply(textToSearch, drugObject['general_precautions']);
      }

      if (drugObject['warnings_and_precautions']) {
        textToSearch.push.apply(textToSearch, drugObject['warnings_and_precautions']);
      }

      if (drugObject['adverse_reactions']) {
        textToSearch.push.apply(textToSearch, drugObject['adverse_reactions']);
      }

      var i, j;

      var found = false;

      var splitText = textToSearch[0].split('.');
      for(i = 0; i < splitText.length; i++) {
        if (splitText[i].match(effect)) {
          found = true;
          break;
        }
      }

      if (found == true) {
        return splitText[i];
      } else {
        return splitText;
      }
    }

    $scope.completeIndex = function(index, accurate, first){
      if (first) {
        var term = $scope.displayedStuff.splice(index, 1)[0];
        if ($scope.adverseEffects.length > 0) addDisplayedStuff();
        if (accurate) {
          var post = {name: $scope.selectedDrug.brand_name, effects: [term]};
          APIService.getDrugEffectApi().post(post).then(serviceError, serviceError);
        }
      }
    };

    $scope.adverseTooltip = "Add a new adverse affect not currently reported";

    $scope.addSelectedSymptom = function () {
      var elem = $('#selsym')[0];
      var value = elem.value;
      if(contains($scope.symptoms,value) && !effectsContain(value)){
        $scope.effects.push({medical_term: value, layman_term: value, checked:true});
        $scope.selectedSymptom = '';
        elem.value = '';
      }
    };

    $scope.submitEffects = function(){
      var post = {name:$scope.selectedDrug.brand_name, effects:[]};
      for(var i in $scope.effects){
        if($scope.effects[i].checked){
          post.effects.push($scope.effects[i].medical_term)
        }
      }
      APIService.getDrugEffectApi().post(post).then(serviceError,serviceError);

    };

    $scope.getPercentage = function() {
      var div = ($scope.count-1)/$scope.total;
      var percent = div * 100;
      return Math.floor(percent);
    };

    function effectsContain(obj){
      var a = $scope.effects;
      for (var i = 0; i < a.length; i++) {
        if (a[i].medical_term == obj) {
          return true;
        }
      }
      return false;
    }

    function contains(a, obj) {
      for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
          return true;
        }
      }
      return false;
    }

    $scope.symptoms = ["drug ineffective","nausea","death","fatigue","headache","dyspnoea","pain","dizziness","vomiting","diarrhoea","malaise","asthenia","pyrexia","myocardial infarction","rash","fall","arthralgia","anxiety","depression","pain in extremity","insomnia","pruritus","pneumonia","cerebrovascular accident","injection site pain","weight decreased","chest pain","abdominal pain","feeling abnormal","oedema peripheral","hypertension","back pain","anaemia","convulsion","cough","weight increased","hypotension","blood glucose increased","somnolence","tremor","abdominal pain upper","myalgia","confusional state","gait disturbance","drug interaction","condition aggravated","paraesthesia","decreased appetite","muscle spasms","constipation","off label use","flushing","hypoaesthesia","loss of consciousness","dehydration","erythema","renal failure acute","renal failure","overdose","injection site erythema","hypersensitivity","drug dose omission","product quality issue","urticaria","blood pressure increased","pulmonary embolism","hyperhidrosis","vision blurred","urinary tract infection","drug exposure during pregnancy","cardiac failure congestive","nasopharyngitis","palpitations","chills","muscular weakness","haemoglobin decreased","completed suicide","cardiac arrest","sepsis","cardiac disorder","thrombocytopenia","syncope","suicidal ideation","injury","alopecia","memory impairment","incorrect dose administered","deep vein thrombosis","infection","influenza like illness","heart rate increased","diabetes mellitus","abdominal discomfort","wrong technique in drug usage process","dyspepsia","atrial fibrillation","tachycardia","pharmaceutical product complaint","platelet count decreased","disease progression","agitation","neutropenia","chest discomfort","haemorrhage","drug hypersensitivity","abdominal distension","general physical health deterioration","alanine aminotransferase increased","dysphagia","white blood cell count decreased","psoriasis","gastrointestinal haemorrhage","respiratory failure","sinusitis","drug effect decreased","dysgeusia","balance disorder","aspartate aminotransferase increased","thrombosis","gastrooesophageal reflux disease","breast cancer","drug withdrawal syndrome","contusion","amnesia","blood creatinine increased","multiple sclerosis relapse","cardiac failure","joint swelling","medication error","no adverse event","dry mouth","intentional drug misuse","toxicity to various agents","asthma","device expulsion","suicide attempt","injection site swelling","adverse event","visual impairment","pancreatitis","rheumatoid arthritis","hallucination","incorrect route of drug administration","bronchitis","emotional distress","tardive dyskinesia","aggression","blood pressure decreased","burning sensation","injection site reaction","injection site pruritus","feeling hot","migraine","pleural effusion","oropharyngeal pain","irritability","musculoskeletal stiffness","swelling face","nervousness","arthritis","swelling","renal impairment","influenza","lethargy","unevaluable event","epistaxis","injection site haemorrhage","abnormal behaviour","inappropriate schedule of drug administration","cardio-respiratory arrest","hyponatraemia","extrapyramidal disorder","pancytopenia","arrhythmia","hypoglycaemia","stress","musculoskeletal pain","blood cholesterol increased","nervous system disorder","bradycardia","oedema","neuropathy peripheral","speech disorder","hepatic enzyme increased","disturbance in attention","visual acuity reduced","coronary artery disease","rhabdomyolysis","hot flush","blood glucose decreased","abasia","international normalised ratio increased","cardiovascular disorder","local swelling","coma","multi-organ failure","flatulence","febrile neutropenia","drug abuse","vertigo","disorientation","gastrointestinal disorder","therapeutic response decreased","liver function test abnormal","chronic obstructive pulmonary disease","injection site bruising","osteonecrosis","multiple sclerosis","respiratory arrest","neck pain","drug administration error","mobility decreased","leukopenia","transient ischaemic attack","bone pain","femur fracture","cellulitis","malignant neoplasm progression","drug toxicity","pulmonary oedema","cholelithiasis","blood creatine phosphokinase increased","menstruation irregular","abortion spontaneous","breast cancer female","dyskinesia","white blood cell count increased","depressed level of consciousness","anorexia","rash pruritic","sleep disorder","road traffic accident","neoplasm malignant","hypokalaemia","intentional overdose","crying","herpes zoster","dysphonia","rash generalised","incorrect drug administration duration","anaphylactic reaction","liver disorder","abnormal dreams","dysarthria","activities of daily living impaired","mental disorder","infusion related reaction","blister","cataract","rectal haemorrhage","fear","tinnitus","staphylococcal infection","vaginal haemorrhage","stomatitis","injection site haematoma","hyperglycaemia","interstitial lung disease","blood alkaline phosphatase increased","product substitution issue","dry skin","anger","treatment noncompliance","nasal congestion","lung disorder","type 2 diabetes mellitus","panic attack","angioedema","restlessness","drug dependence","fluid retention","pregnancy","angina pectoris","cognitive disorder","osteoarthritis","renal disorder","wheezing","rash erythematous","rhinorrhoea","jaundice","arthropathy","nightmare","hepatic failure","movement disorder","septic shock","eye pain","hospitalisation","metrorrhagia","depressed mood","dysuria","psychotic disorder","haematochezia","skin exfoliation","mental status changes","skin discolouration","pollakiuria","dystonia","blood bilirubin increased","mood swings","upper respiratory tract infection","acute myocardial infarction","swollen tongue","hepatic function abnormal","surgery","throat irritation","stevens-johnson syndrome","hyperkalaemia","oxygen saturation decreased","lymphadenopathy","blindness","nephrolithiasis","cerebral haemorrhage","osteoporosis","gamma-glutamyltransferase increased","inflammation","foetal exposure during pregnancy","pruritus generalised","haematuria","adverse drug reaction","impaired healing","grand mal convulsion","hypoxia","urinary incontinence","drug intolerance","delirium","device malfunction","device dislocation","respiratory distress","aphasia","blood potassium decreased","urinary retention","gastritis","eye swelling","ocular hyperaemia","c-reactive protein increased","accidental overdose","lip swelling","blood urea increased","gastric disorder","haematocrit decreased","eye irritation","ascites","cystitis","neutrophil count decreased","gallbladder disorder","hypothyroidism","application site erythema","anhedonia","ill-defined disorder","hip fracture","hepatitis","erectile dysfunction","discomfort","intestinal obstruction","injection site warmth","emotional disorder","head injury","haematemesis","respiratory disorder","menorrhagia","heart rate decreased","unresponsive to stimuli","electrocardiogram qt prolonged","withdrawal syndrome","pallor","bone disorder","diplopia","blood triglycerides increased","throat tightness","metabolic acidosis","cerebral infarction","feeling cold","post procedural complication","haematoma","heart rate irregular","viral infection","maternal exposure during pregnancy","mood altered","haemoptysis","eye disorder","no therapeutic response","dysstasia","epilepsy","renal failure chronic","premature baby","shock","abdominal pain lower","pain in jaw","pharyngeal oedema","rash macular","osteonecrosis of jaw","blood lactate dehydrogenase increased","lung neoplasm malignant","crohn's disease","economic problem","night sweats","colitis","acne","ageusia","anaphylactic shock","muscle twitching","red blood cell count decreased","injection site rash","intervertebral disc protrusion","fungal infection","productive cough","pancreatitis acute","mucosal inflammation","mental impairment","hypersomnia","colitis ulcerative","dyspnoea exertional","therapeutic response unexpected","sedation","pulmonary hypertension","encephalopathy","injection site irritation","thinking abnormal","coordination abnormal","chromaturia","amenorrhoea","paranoia","body temperature increased","melaena","coronary artery occlusion","dry eye","peritonitis","skin ulcer","circulatory collapse","pneumonia aspiration","skin disorder","skin burning sensation","lactic acidosis","cyanosis","impaired work ability","drug prescribing error","skin lesion","feeling jittery","blood sodium decreased","cardiomegaly","joint stiffness","gastric ulcer","haemorrhoids","faeces discoloured","myocardial ischaemia","face oedema","pelvic pain","caesarean section","pericardial effusion","ventricular tachycardia","disseminated intravascular coagulation","mania","application site pruritus","diverticulitis","hepatic steatosis","hyperlipidaemia","procedural pain","deafness","anosmia","lower respiratory tract infection","leukocytosis","rash maculo-papular","cholecystitis chronic","hemiparesis","osteomyelitis","visual disturbance","bone marrow failure","maternal drugs affecting foetus","hallucination, visual","rash papular","acute respiratory distress syndrome","coagulopathy","drug dispensing error","poisoning","crohn^s disease","exposure during pregnancy","inflammatory bowel disease","presyncope","medical device complication","transaminases increased","psychomotor hyperactivity","middle insomnia","underdose","haemodialysis","lung infection","drug abuser","hypophagia","intra-uterine contraceptive device expelled","cold sweat","oral pain","joint injury","tooth disorder","cardiomyopathy","disease recurrence","pharyngolaryngeal pain","injection site urticaria","rib fracture","palmar-plantar erythrodysaesthesia syndrome","retching","fibromyalgia","sinus tachycardia","dementia","multiple injuries","mitral valve incompetence","mouth ulceration","lacrimation increased","upper limb fracture","scar","dialysis","cholestasis","stomach discomfort","foot fracture","diabetes mellitus inadequate control","irritable bowel syndrome","restless legs syndrome","tendonitis","hypocalcaemia","sensory disturbance","multiple myeloma","sudden death","blood potassium increased","altered state of consciousness","pulmonary fibrosis","drug eruption","systemic lupus erythematosus","prostate cancer","orthostatic hypotension","expired drug administered","eating disorder","bronchospasm","glaucoma","hallucination, auditory","multiple drug overdose","toothache","blood urine present","ear pain","eczema","eyelid oedema","serotonin syndrome","toxic epidermal necrolysis","sleep apnoea syndrome","localised infection","myelodysplastic syndrome","respiratory tract infection","glossodynia","pneumonitis","lung infiltration","injection site mass","eye pruritus","ear infection","drug level increased","hepatotoxicity","hiatus hernia","accidental exposure","abortion induced","neuralgia","hypoaesthesia oral","akathisia","bacterial infection","tooth extraction","fluid overload","ulcer","ventricular extrasystoles","inadequate analgesia","agranulocytosis","wrong drug administered","paralysis","eructation","eosinophilia","limb injury","ventricular fibrillation","hepatic cirrhosis","muscle tightness","delusion","ischaemic stroke","cholecystitis","photophobia","injection site induration","aphagia","sneezing","gastroenteritis","cholecystectomy","laceration","atelectasis","abscess","ankle fracture","choking","increased appetite","acute myeloid leukaemia","tendon rupture","rotator cuff syndrome","bipolar disorder","drug administered at inappropriate site","cardiac murmur","deformity","proteinuria","poor quality sleep","lower limb fracture","psoriatic arthropathy","ejection fraction decreased","generalised oedema","neoplasm progression","spinal fracture","pulmonary congestion","blindness unilateral","impaired driving ability","haemorrhage intracranial","mydriasis","diabetic ketoacidosis","gout","glycosylated haemoglobin increased","thirst","candidiasis","brain oedema","photosensitivity reaction","neuroleptic malignant syndrome","quality of life decreased","application site rash","therapeutic response unexpected with drug substitution","hepatomegaly","apathy","muscle spasticity","unintended pregnancy","sinus disorder","hearing impaired","peripheral coldness","musculoskeletal disorder","breast cancer metastatic","oesophagitis","post procedural haemorrhage","musculoskeletal chest pain","application site pain","lymphoma","libido decreased","eye haemorrhage","back disorder","sensation of heaviness","blood pressure systolic increased","myoclonus","kidney infection","arteriosclerosis","acute respiratory failure","drug ineffective for unapproved indication","knee arthroplasty","ileus","dental caries","hernia","metastases to liver","procedural complication","cytomegalovirus infection","application site irritation","frequent bowel movements","faecal incontinence","osteopenia","carpal tunnel syndrome","gastric haemorrhage","ataxia","pneumothorax","hypoacusis","sinus congestion","subdural haematoma","intraocular pressure increased","hepatitis c","gastroenteritis viral","blood pressure fluctuation","peritonitis bacterial","hypotonia","respiratory depression","obesity","respiratory tract congestion","pancreatic carcinoma","vasculitis","thyroid disorder","liver injury","central nervous system lesion","limb discomfort","fracture","injection site nodule","device related infection","oral discomfort","prothrombin time prolonged","colon cancer","wound","paraesthesia oral","nicotine dependence","emphysema","drug effect incomplete","genital haemorrhage","laboratory test abnormal","ovarian cyst","bladder cancer","supraventricular tachycardia","tachypnoea","sexual dysfunction","intervertebral disc degeneration","oral herpes","tricuspid valve incompetence","dermatitis","blood glucose fluctuation","device difficult to use","muscle atrophy","personality change","musculoskeletal discomfort","bedridden","congenital anomaly","cardiogenic shock","application site reaction","small intestinal obstruction","muscle rigidity","blood albumin decreased","spinal osteoarthritis","basal cell carcinoma","pregnancy with contraceptive device","aspiration","renal injury","dependence","malnutrition","gingival bleeding","difficulty in walking","drug screen positive","euphoric mood","oral candidiasis","atrial septal defect","breast tenderness","optic neuritis","cytolytic hepatitis","purpura","erythema multiforme","blood calcium decreased","splenomegaly","therapeutic agent toxicity","pharyngitis","platelet count increased","sinus bradycardia","anuria","drug rash with eosinophilia and systemic symptoms","wrist fracture","upper gastrointestinal haemorrhage","hypercalcaemia","hypokinesia","product adhesion issue","increased upper airway secretion","tuberculosis","hyperthyroidism","multiple drug overdose intentional","hypercholesterolaemia","urine output decreased","blood pressure inadequately controlled","breast pain","incontinence","toxic skin eruption","plasma cell myeloma","refusal of treatment by patient","device failure","generalised erythema","angina unstable","acute hepatic failure","injection site extravasation","intestinal perforation","hypomagnesaemia","vaginal discharge","metastases to bone","prescribed overdose","tooth abscess","blood glucose abnormal","haemolytic anaemia","cyst","bronchopneumonia","conjunctivitis","respiratory rate increased","petechiae","status epilepticus","mass","circumstance or information capable of leading to medication error","fistula","low turnover osteopathy","bursitis","dysmenorrhoea","sciatica","diverticulum","apnoea","hypertonia","menstruation delayed","arterial occlusive disease","device breakage","coronary artery bypass","initial insomnia","acute coronary syndrome","renal tubular necrosis","hip arthroplasty","bone density decreased","skin irritation","macular degeneration","nerve injury","electrolyte imbalance","blood pressure abnormal","bladder disorder","tongue disorder","general symptom","electrocardiogram abnormal","dermatitis exfoliative","tooth infection","hypothermia","red blood cell sedimentation rate increased","skin reaction","eyelid ptosis","intentional self-injury","hypertensive crisis","myopathy","tooth fracture","muscle disorder","hemiplegia","inappropriate antidiuretic hormone secretion","granulocytopenia","nocturia","neutrophil count increased","nephrogenic systemic fibrosis","uterine perforation","skin cancer","embolism","peritoneal dialysis complication","rash pustular","pulmonary haemorrhage","clostridium difficile colitis","obsessive-compulsive disorder","lymphopenia","injection site discolouration","parkinsonism","exostosis","torsade de pointes","motor dysfunction","hepatic encephalopathy","stent placement","tooth loss","malignant melanoma","joint dislocation","activated partial thromboplastin time prolonged","nodule","aphonia","lymphocyte count decreased","arteriosclerosis coronary artery","micturition urgency","pain of skin","lipase increased","premature labour","incoherent","oedema mouth","visual field defect","clostridial infection","hunger","neurotoxicity","acidosis","extrasystoles","subarachnoid haemorrhage","coronary arterial stent insertion","flank pain","blood count abnormal","salivary hypersecretion","tubulointerstitial nephritis","anorectal discomfort","decubitus ulcer","coronary artery stenosis","retinal haemorrhage","angioneurotic oedema","bacteraemia","myositis","hyperbilirubinaemia","atrial flutter","graft versus host disease","renal cyst","laryngitis","pulmonary arterial hypertension","metastases to central nervous system","retinal detachment","increased tendency to bruise","back injury","spinal disorder","renal pain","tenderness","iucd complication","spinal column stenosis","ecchymosis","parkinson's disease","lung neoplasm","coeliac disease","uterine leiomyoma","medication residue","nephropathy toxic","disability","multiple fractures","sinus headache","therapy non-responder","herpes simplex","oral intake reduced","poor quality drug administered","duodenal ulcer","vitamin d deficiency","spinal compression fracture","drug resistance","atrioventricular block","dermatitis contact","dry throat","treatment failure","family stress","iron deficiency anaemia","pericarditis","drug reaction with eosinophilia and systemic symptoms","immune system disorder","hyperaesthesia","jaw disorder","accident","diarrhoea haemorrhagic","hysterectomy","dermatitis allergic","joint range of motion decreased","neoplasm","affect lability","schizophrenia","metastases to lung","gingival pain","formication","peripheral vascular disorder","thermal burn","self injurious behaviour","drug withdrawal syndrome neonatal","pelvic fracture","menstrual disorder","excoriation","lupus-like syndrome","facial pain","viith nerve paralysis","sluggishness","stress fracture","hypovolaemia","ventricular septal defect","ulcer haemorrhage","sensory loss","international normalised ratio decreased","hydronephrosis","feeling drunk","pneumocystis jiroveci pneumonia","alcohol use","hypoalbuminaemia","angiopathy","oliguria","prostatic specific antigen increased","polyneuropathy","low density lipoprotein increased","homicidal ideation","infarction","pleurisy","scab","hyperthermia","cerebral ischaemia","screaming","groin pain","urosepsis","squamous cell carcinoma","cholecystitis acute","colitis ischaemic","tension","atrioventricular block complete","pseudomonas infection","heparin-induced thrombocytopenia","haemolysis","hiccups","breast mass","gynaecomastia","blood disorder","hepatocellular damage","appendicitis","somnambulism","nasal discomfort","accidental exposure to product","hepatocellular injury","blood calcium increased","major depression","body height decreased","neutropenic sepsis","skin laceration","failure to thrive","full blood count decreased","parosmia","ovarian cancer","pharyngitis streptococcal","pyelonephritis","facial palsy","hepatitis acute","investigation","hepatitis b","hepatic neoplasm malignant","acute pulmonary oedema","polyuria","pulse absent","rectal discharge","ear discomfort","application site vesicles","dermatitis bullous","muscle strain","gastrointestinal pain"];
  });
